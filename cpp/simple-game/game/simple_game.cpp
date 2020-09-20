#include "simple_game.hpp"

#include "memory_allocator.hpp"
#include "objects.hpp"
#include "save_allocator.hpp"
#include "static_allocator.hpp"
#include "utilities.hpp"

#include <cassert>

simple_game::simple_game(game::memory const &memory, game::save const &save)
    : main(), state(nullptr) {
  assert(memory.size >= save.size);
  static_allocator::instance(memory.data, memory.size);
  state.reset(
      game::object::GetSizePrefixedstate_t(save.data + save.offset)->UnPack());
  if (!state->player) {
    state->player.reset(new game::object::rectangle_t());
    state->player->mutable_dimensions() = game::object::dimensions_t(100, 100);
  }
}

void simple_game::destroy(game::save &save) {
  auto allocator = save_allocator(save.data, save.size);
  auto fbb = flatbuffers::FlatBufferBuilder(save.size, &allocator);
  fbb.FinishSizePrefixed(game::object::state_t::Pack(fbb, state.get()));
  fbb.ReleaseRaw(save.size, save.offset);
  delete this;
}

void simple_game::output(game::input const &input, game::frame &output) {
  update(input);
  render(output);
}

void simple_game::update(game::input const &input) {
  auto movementSpeed = 540.0f / 4.0f;
  auto dPlayerX = 0.0f;
  auto dPlayerY = 0.0f;
  if (input.W.active)
    dPlayerY = 1.0f;
  if (input.S.active)
    dPlayerY = -1.0f;
  if (input.D.active)
    dPlayerX = 1.0f;
  if (input.A.active)
    dPlayerX = -1.0f;

  auto &playerPosition = state->player->mutable_position();
  playerPosition.mutate_x(playerPosition.x() +
                          dPlayerX * movementSpeed * input.timeDelta);
  playerPosition.mutate_y(playerPosition.y() +
                          dPlayerY * movementSpeed * input.timeDelta);

  state->time += input.timeDelta;
}

void simple_game::render(game::frame &output) {
  game::object::color_t background_color = {0.7, 0.7, 0.7};
  drawRectangle(output, state->player, {0.7, 0.7, 0.7});
  // drawTileMap(output);
  // drawPlayer(output);
}

void simple_game::drawRectangle(
    game::frame &output, std::unique_ptr<game::object::rectangle_t> const &rect,
    game::object::color_t const &color) {
  auto buffer = output.data;
  auto starty = to_uint32_t(rect->position().y());
  auto endy = starty + to_uint32_t(rect->dimensions().height());
  auto startx = to_uint32_t(rect->position().x());
  auto endx = startx + to_uint32_t(rect->dimensions().width());

  starty = clamp(starty, 0, output.height - 1);
  endy = clamp(endy, 0, output.height - 1);

  startx = clamp(startx, 0, output.width - 1);
  endx = clamp(endx, 0, output.width - 1);

  auto rgbColor = to_uint32_t(color);
  for (auto y = starty; y != endy; ++y) {
    for (auto x = startx; x != endx; ++x) {
      buffer[x + y * output.stride] = rgbColor;
    }
  }
}
/*
void simple_game::drawTileMap(game::frame &output) {
  // clang-format off
  uint32_t tileMap[9][16] = {
    {1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,},
    {1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,},
    {1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,},
    {0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,},
    {1,0,0,1,1,0,0,0,1,0,0,1,0,0,0,1,},
    {1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,},
    {1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,},
    {1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,},
    {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,},
  };
  // clang-format on

  auto tileHeight = (output.height - (output.height % 9)) / 9.0f;
  auto tileWidth = (output.width - (output.width % 16)) / 16.0f;

  for (uint32_t row = 0; row < 9; ++row) {
    for (uint32_t col = 0; col < 16; ++col) {
      if (tileMap[row][col]) {
        auto y = row * tileHeight;
        auto x = col * tileWidth;
        drawRectangle(output, {x, y}, {tileWidth, tileHeight},
                      {1.0f, 1.0f, 1.0f});
      }
    }
  }
}
*/
void simple_game::output(game::audio &output) {
  memset(output.data, 0, output.length * sizeof(float_t));
  //  if (state->sound) {
  //    state->time = sineWave(output, state->frequency, state->time);
  //  }
}

/*
void simple_game::drawPlayer(game::frame &output) {
  auto playerHeight = 60.0f;
  auto playerWidth = 40.0f;
  drawRectangle(output, {state->playerX, state->playerY},
                {playerWidth, playerHeight}, {1.0f, 0.0f, 0.0f});
}
*/

/*
uint32_t simple_game::sineWave(game::audio &buffer, float_t frequency,
                               uint32_t t) {
  static float_t freq = frequency;
  uint32_t quarterSampleRate = buffer.sampleRate / 4;
  auto data = buffer.data;
  auto dataEnd = buffer.data + buffer.length;
  for (; data != dataEnd; data += 1) {
    float_t sample = 0.01 * sinf(2.0f * M_PI * freq * t / buffer.sampleRate);
    *data = sample;
    t += 1;
    if ((t % quarterSampleRate) == 0)
      freq = frequency;
    if (t == buffer.sampleRate)
      t = 0;
  }
  return t;
}
*/
