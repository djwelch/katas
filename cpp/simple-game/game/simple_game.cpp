#include <assert.h>

#include "player.hpp"
#include "primitives.hpp"
#include "render.hpp"
#include "simple_game.hpp"
#include "software_renderer.hpp"
#include "static_allocator.hpp"
#include "utilities.hpp"

SimpleGame::SimpleGame(Game::Memory const &memory,
                       Game::State const &savedGameState)
    : Main() {
  assert(memory.size >= savedGameState.size);
  state = reinterpret_cast<Buffers::StateT *>(memory.data);
  Buffers::GetSizePrefixedState(savedGameState.data + savedGameState.offset)
      ->UnPackTo(state);
}

void SimpleGame::destroy(Game::State &gameState) {
  StaticAllocator allocator(gameState);
  flatbuffers::FlatBufferBuilder fbb =
      flatbuffers::FlatBufferBuilder(1024, &allocator);
  fbb.FinishSizePrefixed(Buffers::State::Pack(fbb, state));
  uint64_t size;
  uint64_t offset;
  fbb.ReleaseRaw(size, offset);
  gameState.offset = offset;
  gameState.size = size;
  delete this;
}

void SimpleGame::output(Game::Input const &inputs, Game::Frame &output) {
  update(inputs);
  render(output);
}

void SimpleGame::update(Game::Input const &inputs) {
  auto movementSpeed = 540.0f / 4;
  auto dPlayerX = 0.0f;
  auto dPlayerY = 0.0f;
  if (inputs.W.active)
    dPlayerY = 1.0f;
  if (inputs.S.active)
    dPlayerY = -1.0f;
  if (inputs.D.active)
    dPlayerX = 1.0f;
  if (inputs.A.active)
    dPlayerX = -1.0f;

  state->playerX += dPlayerX * movementSpeed * inputs.timeDelta;
  state->playerY += dPlayerY * movementSpeed * inputs.timeDelta;
}

void SimpleGame::render(Game::Frame &) {
  // Color backgroundColor = {0.7, 0.7, 0.7};
  // drawRectangle(output, {0.0f, 0.0f}, {width, height}, {0.7, 0.7, 0.7});
  // drawTileMap(output);
  // drawPlayer(output);
}

void SimpleGame::drawTileMap(Game::Frame &output) {
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

void SimpleGame::output(Game::Audio &output) {
  if (state->sound) {
    state->time = sineWave(output, state->frequency, state->time);
  }
}

void SimpleGame::drawPlayer(Game::Frame &output) {
  auto playerHeight = 60.0f;
  auto playerWidth = 40.0f;
  drawRectangle(output, {state->playerX, state->playerY},
                {playerWidth, playerHeight}, {1.0f, 0.0f, 0.0f});
}

void SimpleGame::drawRectangle(Game::Frame &output, Point const &position,
                               Size const &size, Color const &color) {
  auto buffer = output.data;
  auto starty = toUInt32(position.y);
  auto endy = starty + toUInt32(size.height);
  auto startx = toUInt32(position.x);
  auto endx = startx + toUInt32(size.width);

  starty = clamp(starty, 0, output.height - 1);
  endy = clamp(endy, 0, output.height - 1);

  startx = clamp(startx, 0, output.width - 1);
  endx = clamp(endx, 0, output.width - 1);

  auto rgbColor = toUInt32(color);
  for (auto y = starty; y != endy; ++y) {
    for (auto x = startx; x != endx; ++x) {
      buffer[x + y * output.stride] = rgbColor;
    }
  }
}

uint32_t SimpleGame::sineWave(Game::Audio &buffer, float_t frequency,
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
