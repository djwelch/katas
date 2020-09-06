#include <boost/log/trivial.hpp>
#include <boost/log/sources/severity_logger.hpp>

#include "simple_game.hpp"

using namespace boost::log::trivial;
boost::log::sources::severity_logger<severity_level> lg;

Game * Game::Create(Platform *platform) {
  return new SimpleGame();
}

static void clearPixels(GameBuffer const & buffer, uint32_t color) {
  auto data = buffer.data;
  auto bufferEnd = data + buffer.stride*buffer.height;

  for(; data != bufferEnd; data += buffer.stride) {
    auto scanLineBegin = reinterpret_cast<uint32_t *>(data);
    auto scanLineEnd = scanLineBegin+buffer.width;
    for(auto pixel = scanLineBegin; pixel != scanLineEnd; ++pixel) {
      *pixel = color;
    }
  }
}

SimpleGame::SimpleGame() : Game() {
}

SimpleGame::~SimpleGame() {
}

void SimpleGame::render(GameBuffer const & buffer) {
  uint8_t red = 0x7f;
  uint8_t green = 0x7f;
  uint8_t blue = 0x7f;
  uint32_t color = red << 16 | green << 8 | blue;
  clearPixels(buffer, color);
}

void SimpleGame::keyPress(char key) {
  BOOST_LOG_SEV(lg, info) << "KeyPress: " << key;
}

