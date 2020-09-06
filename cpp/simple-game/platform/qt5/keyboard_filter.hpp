#ifndef KEYBOARDFILTER_H
#define KEYBOARDFILTER_H

#include <QObject>
#include <QKeyEvent>

#include <game/game.hpp>

class KeyboardFilter : public QObject
{
  Q_OBJECT
  public:
    void setGame(Game * game);
  protected:
    bool eventFilter(QObject *, QEvent *);
  private:
    void handleKeyPress(QKeyEvent *);
    Game * game;
};

#endif
