#include <boost/log/trivial.hpp>
#include <boost/log/sources/severity_logger.hpp>

#include "keyboard_filter.h"

using namespace boost::log::trivial;
boost::log::sources::severity_logger<severity_level> lg;

bool KeyboardFilter::eventFilter(QObject *obj, QEvent *event) {
  if (event->type() == QEvent::KeyPress) {
    QKeyEvent *keyEvent = static_cast<QKeyEvent *>(event);
    handleKeyPress(keyEvent);
    return true;
  }
  return QObject::eventFilter(obj, event);
}

void KeyboardFilter::handleKeyPress(QKeyEvent *event) {
  switch(event->key()) {
    case Qt::Key_W:
      BOOST_LOG_SEV(lg, debug) << "KeyPress: W";
      break;
    case Qt::Key_A:
      BOOST_LOG_SEV(lg, debug) << "KeyPress: A";
      break;
    case Qt::Key_S:
      BOOST_LOG_SEV(lg, debug) << "KeyPress: S";
      break;
    case Qt::Key_D:
      BOOST_LOG_SEV(lg, debug) << "KeyPress: D";
      break;
  }
}

