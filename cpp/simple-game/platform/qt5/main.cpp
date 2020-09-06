#include <QApplication>
#include <QLabel>

#include <initializer_list>
#include <signal.h>
#include <unistd.h>

#include "main_window.hpp"

void catchUnixSignals(std::initializer_list<int> quitSignals) {
  auto handler = [](int sig) -> void {
    QApplication::quit();
  };

  sigset_t blocking_mask;
  sigemptyset(&blocking_mask);
  for (auto sig : quitSignals)
    sigaddset(&blocking_mask, sig);

  struct sigaction sa;
  sa.sa_handler = handler;
  sa.sa_mask    = blocking_mask;
  sa.sa_flags   = 0;

  for (auto sig : quitSignals)
    sigaction(sig, &sa, nullptr);
}

int main(int argc, char **argv) {
  QApplication app(argc, argv);
  catchUnixSignals({SIGQUIT, SIGINT, SIGTERM, SIGHUP});
  MainWindow window(app);
  window.show();
  return app.exec();
}

