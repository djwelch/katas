#include "save_allocator.hpp"

uint8_t *save_allocator::allocate(size_t size) {
  assert(!allocated);
  assert(size <= size_total);
  allocated = true;
  return data;
}

void save_allocator::deallocate(uint8_t *ptr, size_t size) {
  assert(allocated);
  assert(size <= size_total);
  assert(ptr == data);
  allocated = false;
}

