#ifndef SIMPLEGAME_H
#define SIMPLEGAME_H

#include <game/game.hpp>

class SimpleGame : public Game {
  public:
    SimpleGame();
    ~SimpleGame();
    void render(GameBuffer const & buffer) override;
    void keyPress(char key) override;
};

#endif
