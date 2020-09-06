#include <QApplication>
#include <QLabel>

#include "main_window.hpp"

int main(int argc, char **argv) {
  QApplication app(argc, argv);
  MainWindow window(app);
  window.show();
  return app.exec();
}

