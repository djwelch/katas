#ifndef GAME_HPP_FF40D715_9BB9_4DF1_B4FC_3409C5903D23
#define GAME_HPP_FF40D715_9BB9_4DF1_B4FC_3409C5903D23

#include <math.h>
#include <stdint.h>

extern "C" char *LOGTIME();

#define INFO                                                                   \
  std::cout << LOGTIME() << __FILE__ << "(" << __LINE__ << "):" << __func__    \
            << ":"
#define WARN                                                                   \
  std::cout << LOGTIME() << __FILE__ << "(" << __LINE__ << "):" << __func__    \
            << ":"
#define ERROR                                                                  \
  std::cout << LOGTIME() << __FILE__ << "(" << __LINE__ << "):" << __func__    \
            << ":"

namespace game {

struct memory {
  uint8_t *data;
  uint64_t size;
};

struct save {
  uint8_t *data;
  uint64_t offset;
  uint64_t size;
};

struct keyboard_input {
  bool active;
};

struct input {
  float_t timeDelta;
  keyboard_input W;
  keyboard_input A;
  keyboard_input S;
  keyboard_input D;
};

struct audio {
  float_t *data;
  uint32_t length;
  uint32_t sampleRate;
};

struct frame {
  uint32_t *data;
  uint32_t width;
  uint32_t height;
  uint32_t stride;
};

class main {
protected:
  main();
  virtual ~main();

public:
  virtual void destroy(save &) = 0;
  virtual void output(input const &, frame &) = 0;
  virtual void output(audio &) = 0;
};

typedef main *(*GameFactory)(memory const &, save const &);

} // namespace game

#endif
