#include "keyboard_filter.hpp"

KeyboardFilter::KeyboardFilter(Game * game) : game(game) { }

bool KeyboardFilter::eventFilter(QObject *obj, QEvent *event) {
  if (event->type() == QEvent::KeyPress) {
    QKeyEvent *keyEvent = static_cast<QKeyEvent *>(event);
    handleKeyPress(keyEvent);
    return true;
  }
  return QObject::eventFilter(obj, event);
}

void KeyboardFilter::handleKeyPress(QKeyEvent *event) {
  // TODO: input state platform abstraction.
  auto key = event->key();
  switch(key) {
    case Qt::Key_W:
    case Qt::Key_A:
    case Qt::Key_S:
    case Qt::Key_D:
      game->keyPress(key);
      break;
  }
}

