#ifndef GAME_H
#define GAME_H

#include <stdint.h>

struct GameBuffer {
  uint8_t * data;
  uint32_t width;
  uint32_t height;
  uint32_t stride;
};

class Platform {
};

class Game
{
  public:
    static Game * Create(Platform *);
  public:
    Game();
    virtual ~Game();
    virtual void render(GameBuffer const & buffer) = 0;
    virtual void keyPress(char key) = 0;
};

#endif
