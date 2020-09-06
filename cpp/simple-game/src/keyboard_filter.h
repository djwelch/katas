#ifndef KEYBOARDFILTER_H
#define KEYBOARDFILTER_H

#include <QObject>
#include <QKeyEvent>

class KeyboardFilter : public QObject
{
  Q_OBJECT
  protected:
    bool eventFilter(QObject *, QEvent *);
  private:
    void handleKeyPress(QKeyEvent *);
};

#endif
