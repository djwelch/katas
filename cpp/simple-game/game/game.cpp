#include <game/game.hpp>

#include "simple_game.hpp"

#include <algorithm>
#include <iostream>
#include <tuple>
#include <sys/time.h>

extern "C" game::main *CreateGame(game::memory const &memory,
                                  game::save const &save) {
  return new simple_game(memory, save);
}

game::main::main() = default;

game::main::~main() = default;

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
