#include <boost/log/trivial.hpp>
#include <boost/log/sources/severity_logger.hpp>

#include "simple_game.hpp"

using namespace boost::log::trivial;
boost::log::sources::severity_logger<severity_level> lg;

Game * Game::Create(Platform *platform) {
  return new SimpleGame();
}

static void clearPixels(uint8_t * buffer, uint32_t width, uint32_t height, uint32_t stride) {
  auto bufferEnd = buffer + stride*height;

  for(; buffer != bufferEnd; buffer += stride) {
    auto scanLineBegin = reinterpret_cast<uint32_t *>(buffer);
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

SimpleGame::SimpleGame() : Game() {
}

SimpleGame::~SimpleGame() {
}

void SimpleGame::render(GameBuffer const & buffer) {
  clearPixels(buffer.data, buffer.width, buffer.height, buffer.stride);
}

void SimpleGame::keyPress(char key) {
  BOOST_LOG_SEV(lg, info) << "KeyPress: " << key;
}

