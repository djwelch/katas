#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTimer>

#include <game/game.hpp>

#include "keyboard_filter.hpp"

class MainWindow : public QMainWindow, public Platform
{
  Q_OBJECT
  public:
    explicit MainWindow(QApplication &);
    virtual ~MainWindow();
  protected:
    void paintEvent(QPaintEvent *);
    void timerEvent(QTimerEvent *);
  private:
    GameBuffer gameBuffer();
  private:
    int32_t timerIndex;
    QImage drawBuffer;
    QImage backBuffer;
    Game *game;
    KeyboardFilter *keyboardFilter;
};

#endif
