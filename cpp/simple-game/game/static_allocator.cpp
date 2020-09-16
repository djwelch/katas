#include "static_allocator.hpp"

uint8_t *StaticAllocator::allocate(size_t size) {
  assert(state.size == size);
  assert(!allocated);
  allocated = true;
  return state.data;
}

void StaticAllocator::deallocate(uint8_t *, size_t size) {
  assert(allocated);
  assert(state.size == size);
  allocated = false;
}
