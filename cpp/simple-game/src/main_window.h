#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTimer>

class MainWindow : public QMainWindow 
{
  Q_OBJECT
  public:
    explicit MainWindow(QWidget *parent = nullptr);
    virtual ~MainWindow();
  protected:
    void paintEvent(QPaintEvent *);
    void timerEvent(QTimerEvent *);
  private:
    QImage drawBuffer;
    QImage backBuffer;
};

#endif
