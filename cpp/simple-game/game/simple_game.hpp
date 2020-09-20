#ifndef SIMPLE_GAME_HPP_30922BD6_7565_44B7_907F_DB7A5AE4D4ED
#define SIMPLE_GAME_HPP_30922BD6_7565_44B7_907F_DB7A5AE4D4ED

#include "objects.hpp"

#include <game/game.hpp>

#include <memory>

namespace game {
namespace object {
struct state_tT;
}
} // namespace game

class simple_game : public game::main {
public:
  explicit simple_game(game::memory const &, game::save const &);
  void destroy(game::save &) override;
  void output(game::input const &, game::frame &) override;
  void output(game::audio &) override;

private:
  void update(game::input const &);
  void render(game::frame &);
  void drawRectangle(game::frame &,
                     std::unique_ptr<game::object::rectangle_t> const &,
                     game::object::color_t const &);
  // void drawTileMap(game::frame &);
  // void drawPlayer(game::frame &);
  // uint32_t sineWave(game::audio &, float_t, uint32_t);

private:
  std::unique_ptr<game::object::state_tT> state;
  };

#endif
