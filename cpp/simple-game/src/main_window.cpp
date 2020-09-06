#include <QPainter>
#include <QKeyEvent>
#include <iostream>

#include "main_window.h"

static void clearPixels(uint8_t * pixels, uint32_t width, uint32_t height, uint32_t stride) {
  auto pixelsEnd = pixels + stride*height;

  for(; pixels != pixelsEnd; pixels += stride) {
    auto scanLineBegin = reinterpret_cast<uint32_t *>(pixels);
    auto scanLineEnd = scanLineBegin+width;
    for(auto pixel = scanLineBegin; pixel != scanLineEnd; ++pixel) {
      uint8_t red = 0x7f;
      uint8_t green= 0x7f;
      uint8_t blue = 0x7f;
      int color = red << 16 | green << 8 | blue;
      *pixel = color;
    }
  }
}

MainWindow::MainWindow(QWidget *parent) 
  : QMainWindow(parent)
  , drawBuffer(800, 600, QImage::Format_RGB32)
  , backBuffer(800, 600, QImage::Format_RGB32) {

  setFixedSize(800, 600);
  startTimer(1000/60, Qt::PreciseTimer);
  setFocusPolicy(Qt::NoFocus);
  setFocus(Qt::ActiveWindowFocusReason);
}

MainWindow::~MainWindow() {
}

void MainWindow::paintEvent(QPaintEvent *) {
  QPainter painter(this);
  painter.drawImage(0, 0, drawBuffer);
}

void MainWindow::timerEvent(QTimerEvent *) {
  auto stride = backBuffer.bytesPerLine();
  auto height = backBuffer.height();
  auto width = backBuffer.width();
  clearPixels(backBuffer.bits(), width, height, stride);
  
  drawBuffer.swap(backBuffer);
  update();
}

