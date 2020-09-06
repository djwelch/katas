#include <QApplication>
#include <QPainter>
#include <QKeyEvent>
#include <iostream>

#include "main_window.hpp"

MainWindow::MainWindow(QApplication &app)
  : QMainWindow(nullptr)
  , drawBuffer(800, 600, QImage::Format_RGB32)
  , backBuffer(800, 600, QImage::Format_RGB32)
  , game(Game::Create(this)) {
  setFixedSize(800, 600);
  startTimer(1000/60, Qt::PreciseTimer);
  setFocusPolicy(Qt::NoFocus);
  setFocus(Qt::ActiveWindowFocusReason);

  keyboardFilter = new KeyboardFilter(game);
  app.installEventFilter(keyboardFilter);
}

MainWindow::~MainWindow() {
}

void MainWindow::paintEvent(QPaintEvent *) {
  QPainter painter(this);
  painter.drawImage(0, 0, drawBuffer);
}

void MainWindow::timerEvent(QTimerEvent *) {
  game->render(gameBuffer());
  drawBuffer.swap(backBuffer);
  update();
}

GameBuffer MainWindow::gameBuffer() {
  return {
    .data = backBuffer.bits(),
    .width = (uint32_t)backBuffer.width(),
    .height = (uint32_t)backBuffer.height(),
    .stride = (uint32_t)backBuffer.bytesPerLine(),
  };
}

