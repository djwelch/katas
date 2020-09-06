#ifndef KEYBOARDFILTER_H
#define KEYBOARDFILTER_H

#include <QObject>
#include <QKeyEvent>

#include <game/game.hpp>

class KeyboardFilter : public QObject
{
  Q_OBJECT
  public:
    explicit KeyboardFilter(Game * game);
  protected:
    bool eventFilter(QObject *, QEvent *);
  private:
    void handleKeyPress(QKeyEvent *);
  private:
    Game * game;
};

#endif
