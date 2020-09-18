#include <game/game.hpp>

#include <X11/X.h>
#include <X11/Xlib.h>
#include <GL/glx.h>
#include <jack/jack.h>

#include <assert.h>
#include <chrono>
#include <cstring>
#include <dlfcn.h>
#include <iostream>
#include <stdlib.h>
#include <sys/select.h>
#include <sys/time.h>
#include <sys/timerfd.h>
#include <unistd.h>

static bool handleNextEvents(Display *, Window, Atom);

static uint32_t audioSampleRate = 0;
static jack_client_t *audioClient = nullptr;
static jack_port_t *audioPort = nullptr;
static void audioInitialize();
static int audioNotify(jack_nframes_t, void *);
static void audioTerminate();

static void *GameLibraryHandle = nullptr;
static int GameReloadTimer = -1;
static itimerspec GameReloadTimeout = {
    .it_interval = {.tv_sec = 2, .tv_nsec = 0},
    .it_value = {.tv_sec = 2, .tv_nsec = 0},
};

static game::memory GameMemory = {
    .data = new uint8_t[1024],
    .size = 1024,
};
static game::save GameSave = {
    .data = new uint8_t[1024],
    .offset = 0,
    .size = 1024,
};
static game::main *Game = nullptr;
static void gameInitialize();
static void gameReload();
static void gameTerminate();

static int FrameTimer = -1;
static itimerspec FrameTimeout = {
    .it_interval = {.tv_sec = 0, .tv_nsec = 33000000},
    .it_value = {.tv_sec = 0, .tv_nsec = 33000000},
};
static uint32_t FrameWidth = 1920 / 2;
static uint32_t FrameHeight = 1080 / 2;
static game::frame FrameBuffer = {
    .data = new uint32_t[FrameWidth * FrameHeight],
    .width = FrameWidth,
    .height = FrameHeight,
    .stride = FrameWidth,
};
GLuint FrameTexture = 0;
static void frameInitialize();
static void frameNotify(Display *, Window);
static void frameTerminate();

static game::input inputs = {0};
static void keypressNotify(XKeyEvent *, bool);
static void keypressClear(XKeyEvent *, bool);

int main(void) {
  auto display = XOpenDisplay(nullptr);
  if (display == nullptr) {
    ERROR << "Unable to open display" << std::endl;
    return 1;
  }
  GLint majorGLX, minorGLX = 0;
  glXQueryVersion(display, &majorGLX, &minorGLX);
  if (majorGLX <= 1 && minorGLX < 2) {
    INFO << "GLX 1.2 or greater is required" << std::endl;
    XCloseDisplay(display);
    return 1;
  } else {
    INFO << "GLX version: " << majorGLX << "." << minorGLX << std::endl;
  }
  auto screen = DefaultScreen(display);
  GLint glxAttribs[] = {GLX_RGBA,
                        GLX_DOUBLEBUFFER,
                        GLX_DEPTH_SIZE,
                        24,
                        GLX_STENCIL_SIZE,
                        8,
                        GLX_RED_SIZE,
                        8,
                        GLX_GREEN_SIZE,
                        8,
                        GLX_BLUE_SIZE,
                        8,
                        GLX_SAMPLE_BUFFERS,
                        0,
                        GLX_SAMPLES,
                        0,
                        None};
  XVisualInfo *visual = glXChooseVisual(display, screen, glxAttribs);

  if (visual == 0) {
    ERROR << "Could not create correct visual window" << std::endl;
    XCloseDisplay(display);
    return 1;
  }

  XSetWindowAttributes windowAttribs;
  windowAttribs.border_pixel = BlackPixel(display, screen);
  windowAttribs.background_pixel = WhitePixel(display, screen);
  windowAttribs.override_redirect = True;
  windowAttribs.colormap = XCreateColormap(display, RootWindow(display, screen),
                                           visual->visual, AllocNone);
  windowAttribs.event_mask = ExposureMask;
  auto window = XCreateWindow(
      display, RootWindow(display, screen), 0, 0, FrameWidth, FrameHeight, 0,
      visual->depth, InputOutput, visual->visual,
      CWBackPixel | CWColormap | CWBorderPixel | CWEventMask, &windowAttribs);
  GLXContext context = glXCreateContext(display, visual, NULL, GL_TRUE);
  glXMakeCurrent(display, window, context);

  INFO << "GL Vendor: " << glGetString(GL_VENDOR) << std::endl;
  INFO << "GL Renderer: " << glGetString(GL_RENDERER) << std::endl;
  INFO << "GL Version: " << glGetString(GL_VERSION) << std::endl;

  Atom wmDeleteMessage = XInternAtom(display, "WM_DELETE_WINDOW", False);
  XSetWMProtocols(display, window, &wmDeleteMessage, 1);

  XSelectInput(display, window, ExposureMask | KeyPressMask | KeyReleaseMask);
  XMapWindow(display, window);
  XFlush(display);

  frameInitialize();
  gameInitialize();
  // audioInitialize();
  gameReload();
  assert(Game != nullptr);

  INFO << "Platform initialized" << std::endl;

  auto X11Events = ConnectionNumber(display);
  bool running = true;
  uint64_t expiryCount;

  auto gc = DefaultGC(display, screen);

  fd_set in_fds;
  do {
    FD_ZERO(&in_fds);
    FD_SET(X11Events, &in_fds);
    FD_SET(GameReloadTimer, &in_fds);
    FD_SET(FrameTimer, &in_fds);
    int maxfd = -1;
    if (maxfd < X11Events)
      maxfd = X11Events;
    if (maxfd < GameReloadTimer)
      maxfd = GameReloadTimer;
    if (maxfd < FrameTimer)
      maxfd = FrameTimer;

    timeval tv;
    tv.tv_sec = 1;
    tv.tv_usec = 0;
    auto ret = select(maxfd + 1, &in_fds, nullptr, nullptr, &tv);
    assert(ret != -1);

    running = handleNextEvents(display, window, wmDeleteMessage);

    if (FD_ISSET(GameReloadTimer, &in_fds)) {
      read(GameReloadTimer, &expiryCount, 8);
      gameReload();
    }

    if (FD_ISSET(FrameTimer, &in_fds)) {
      read(FrameTimer, &expiryCount, 8);
      frameNotify(display, window);
    }
  } while (running);

  audioTerminate();
  gameTerminate();
  frameTerminate();

  glXDestroyContext(display, context);

  XFree(visual);
  XFreeColormap(display, windowAttribs.colormap);
  XDestroyWindow(display, window);
  XCloseDisplay(display);
  return 0;
}

bool handleNextEvents(Display *display, Window window, Atom wmDeleteMessage) {
  XEvent e;
  while (XPending(display)) {
    XNextEvent(display, &e);
    switch (e.type) {
    case Expose:
      XWindowAttributes attribs;
      XGetWindowAttributes(display, window, &attribs);
      glViewport(0, 0, attribs.width, attribs.height);
      INFO << "Window is " << attribs.width << "x" << attribs.height
           << std::endl;
      break;
    case ClientMessage:
      if (e.xclient.data.l[0] == wmDeleteMessage) {
        return false;
      }
      break;
    case KeyPress:
      keypressNotify(&e.xkey, true);
      break;
    case KeyRelease: {
      unsigned short is_retriggered = 0;

      // Key Release gets triggered automatically
      // on X windows even though the key has not been released.
      // The code below removes the extra key releases.
      if (XEventsQueued(display, QueuedAfterReading)) {
        XEvent nev;
        XPeekEvent(display, &nev);

        if (nev.type == KeyPress && nev.xkey.time == e.xkey.time &&
            nev.xkey.keycode == e.xkey.keycode) {
          XNextEvent(display, &e);
          is_retriggered = 1;
        }
      }

      if (!is_retriggered)
        keypressNotify(&e.xkey, false);
    } break;
    }
  }
  return true;
}

void keypressNotify(XKeyEvent *keyEvent, bool active) {
  auto ch = (char)XLookupKeysym(keyEvent, 0);
  game::keyboard_input *i = nullptr;
  switch (ch) {
  case 'w':
    i = &inputs.W;
    break;
  case 'a':
    i = &inputs.A;
    break;
  case 's':
    i = &inputs.S;
    break;
  case 'd':
    i = &inputs.D;
    break;
  };
  if (i != nullptr) {
    i->active = active;
  }
}

void frameInitialize() {
  glGenTextures(1, &FrameTexture);
  glEnable(GL_TEXTURE_2D);
}

void frameTerminate() {
  delete[] FrameBuffer.data;
  FrameBuffer.data = nullptr;
  FrameBuffer.width = 0;
  FrameBuffer.height = 0;
  FrameBuffer.stride = 0;
}

void frameNotify(Display *display, Window window) {
  static auto lastFrameTime = std::chrono::steady_clock::now();
  if (Game == nullptr)
    return;
  auto dt = std::chrono::duration_cast<std::chrono::milliseconds>(
      std::chrono::steady_clock::now() - lastFrameTime);

  inputs.timeDelta = dt.count() / 1000.0f;
  lastFrameTime = std::chrono::steady_clock::now();

  Game->output(inputs, FrameBuffer);

  glViewport(0, 0, FrameWidth, FrameHeight);

  glBindTexture(GL_TEXTURE_2D, FrameTexture);
  glPixelTransferf(GL_RED_SCALE, 1);
  glPixelTransferf(GL_GREEN_SCALE, 1);
  glPixelTransferf(GL_BLUE_SCALE, 1);
  glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, FrameBuffer.width, FrameBuffer.height,
               0, GL_RGBA, GL_UNSIGNED_INT_8_8_8_8, FrameBuffer.data);

  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP);
  glTexEnvi(GL_TEXTURE_2D, GL_TEXTURE_ENV_MODE, GL_MODULATE);
  glEnable(GL_TEXTURE_2D);

  glClearColor(230 / 255.0f, 169 / 255.0f, 224 / 255.0f, 0);
  glClear(GL_COLOR_BUFFER_BIT);

  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();

  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();

  glBegin(GL_TRIANGLES);

  // bottom
  glTexCoord2f(0.0f, 0.0f);
  glVertex2f(-1.0, -1);

  glTexCoord2f(1.0f, 0.0f);
  glVertex2f(1, -1);

  glTexCoord2f(1.0f, 1.0f);
  glVertex2f(1, 1);

  // top
  glTexCoord2f(0.0f, 0.0f);
  glVertex2f(-1, -1);

  glTexCoord2f(1.0f, 1.0f);
  glVertex2f(1, 1);

  glTexCoord2f(0.0f, 1.0f);
  glVertex2f(-1, 1);

  glEnd();

  // Present frame
  glXSwapBuffers(display, window);
}

void audioInitialize() {
  uint32_t audioBufferFrames = 1024;
  audioClient =
      jack_client_open("game", JackOptions::JackNoStartServer, nullptr);
  assert(audioClient != nullptr);

  audioPort =
      jack_port_register(audioClient, "output_1", JACK_DEFAULT_AUDIO_TYPE,
                         JackPortFlags::JackPortIsOutput, audioBufferFrames);
  assert(audioPort != nullptr);

  auto ret = jack_set_process_callback(audioClient, &audioNotify, nullptr);
  assert(ret == 0);

  // jack_on_shutdown(audioClient, &MainWindow::audioShutdown, this);

  audioSampleRate = jack_get_sample_rate(audioClient);
  assert(audioSampleRate == 44100);

  ret = jack_activate(audioClient);
  assert(ret == 0);

  auto outputPorts = jack_get_ports(audioClient, nullptr, nullptr,
                                    JackPortIsPhysical | JackPortIsInput);
  assert(outputPorts != nullptr);

  ret = jack_connect(audioClient, jack_port_name(audioPort), outputPorts[0]);
  assert(ret == 0);

  ret = jack_connect(audioClient, jack_port_name(audioPort), outputPorts[1]);
  assert(ret == 0);

  free(outputPorts);
}

static int audioNotify(jack_nframes_t nframes, void *) {
  static game::audio audioOutput = {0};
  if (Game == nullptr)
    return 0;
  if (audioPort == nullptr) {
    return 1;
  }

  auto outputBuffer =
      static_cast<float_t *>(jack_port_get_buffer(audioPort, nframes));
  memset(outputBuffer, 0, sizeof(float_t) * nframes);
  audioOutput.data = outputBuffer;
  audioOutput.length = nframes;
  audioOutput.sampleRate = audioSampleRate;

  Game->output(audioOutput);

  return 0;
}

static void audioTerminate() {
  if (audioClient == nullptr)
    return;
  if (jack_client_close(audioClient))
    WARN << "Failed to close client";
  audioClient = nullptr;
}

void gameInitialize() {
  int ret;
  memset(GameSave.data, 0, GameSave.size);

  GameReloadTimer = timerfd_create(CLOCK_REALTIME, 0);
  assert(GameReloadTimer != -1);
  ret = timerfd_settime(GameReloadTimer, 0, &GameReloadTimeout, nullptr);
  assert(ret != -1);

  FrameTimer = timerfd_create(CLOCK_REALTIME, 0);
  assert(FrameTimer != -1);
  ret = timerfd_settime(FrameTimer, 0, &FrameTimeout, nullptr);
  assert(ret != -1);
}

void gameReload() {
  static char GameLibrary[] = "./build/game/libgame.so";
  if (Game != nullptr) {
    Game->destroy(GameSave);
    Game = nullptr;
  }

  if (GameLibraryHandle != nullptr) {
    auto ret = dlclose(GameLibraryHandle);
    assert(ret == 0);
    GameLibraryHandle = dlopen(GameLibrary, RTLD_NOLOAD);
    assert(GameLibraryHandle == nullptr);
  }

  GameLibraryHandle = dlopen(GameLibrary, RTLD_NOW);
  if (GameLibraryHandle == nullptr) {
    WARN << dlerror() << std::endl;
    return;
  }
  assert(GameLibraryHandle != nullptr);

  auto CreateGame = (game::GameFactory)dlsym(GameLibraryHandle, "CreateGame");
  assert(CreateGame != nullptr);

  auto newGame = (*CreateGame)(GameMemory, GameSave);
  assert(newGame != nullptr);

  Game = newGame;
}

void gameTerminate() {
  if (Game != nullptr) {
    Game->destroy(GameSave);
    Game = nullptr;
  }
  delete[] GameSave.data;
  GameSave.data = nullptr;
  GameSave.size = 0;
  GameSave.offset = 0;
  delete[] GameMemory.data;
  GameMemory.data = nullptr;
  GameMemory.size = 0;
  if (GameLibraryHandle != nullptr) {
    auto ret = dlclose(GameLibraryHandle);
    assert(ret == 0);
  }
}

extern "C" char *LOGTIME() {
  static char buf[64] = {0};
  char fmt[64];
  struct timeval tv;
  struct tm *tm;

  gettimeofday(&tv, NULL);
  if ((tm = localtime(&tv.tv_sec)) != NULL) {
    strftime(fmt, sizeof fmt, "%Y-%m-%d %H:%M:%S.%%06u:", tm);
    snprintf(buf, sizeof buf, fmt, tv.tv_usec);
  }
  return buf;
}
