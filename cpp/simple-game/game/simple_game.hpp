#ifndef SIMPLE_GAME_HPP_30922BD6_7565_44B7_907F_DB7A5AE4D4ED
#define SIMPLE_GAME_HPP_30922BD6_7565_44B7_907F_DB7A5AE4D4ED

#include <memory>

#include <game/game.hpp>

#include "game_generated.h"
#include "primitives.hpp"

struct Tile {
  bool active;
};

struct TileMap {
  uint32_t width;
  uint32_t height;
  Tile *tiles;
};

class SimpleGame : public Game::Main {
public:
  explicit SimpleGame(Game::Memory const &, Game::State const &);
  void destroy(Game::State &) override;
  void output(Game::Input const &, Game::Frame &) override;
  void output(Game::Audio &) override;

private:
  void update(Game::Input const &);
  void render(Game::Frame &);
  void drawTileMap(Game::Frame &);
  void drawPlayer(Game::Frame &);
  void drawRectangle(Game::Frame &, Point const &, Size const &, Color const &);

  uint32_t sineWave(Game::Audio &, float_t, uint32_t);

private:
  Buffers::StateT *state;
};

#endif
