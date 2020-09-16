#ifndef STATIC_ALLOCATOR_HPP_B1C4793B_08DD_4860_9A04_B231987F8DF5
#define STATIC_ALLOCATOR_HPP_B1C4793B_08DD_4860_9A04_B231987F8DF5

#include <flatbuffers/flatbuffers.h>

#include <game/game.hpp>

class StaticAllocator : public flatbuffers::Allocator {
public:
  StaticAllocator(Game::State const &state) : state(state) {}
  uint8_t *allocate(size_t size) override;
  void deallocate(uint8_t *, size_t size) override;

private:
  bool allocated = false;
  Game::State const &state;
};

#endif
