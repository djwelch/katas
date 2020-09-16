#include <algorithm>
#include <iostream>
#include <tuple>

#include <sys/time.h>

#include <game/game.hpp>

#include "simple_game.hpp"

extern "C" Game::Main *CreateGame(Game::Memory const &memory,
                                  Game::State const &savedGameState) {
  return new SimpleGame(memory, savedGameState);
}

Game::Main::Main() {}

Game::Main::~Main() {}

extern "C" char *LOGTIME() {
  static char buf[64] = {0};
  char fmt[64];
  struct timeval tv;
  struct tm *tm;

  gettimeofday(&tv, NULL);
  if ((tm = localtime(&tv.tv_sec)) != NULL) {
    strftime(fmt, sizeof fmt, "%Y-%m-%d %H:%M:%S.%%06u:", tm);
    snprintf(buf, sizeof buf, fmt, tv.tv_usec);
  }
  return buf;
}
