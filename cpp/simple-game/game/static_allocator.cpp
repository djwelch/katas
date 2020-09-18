#include "static_allocator.hpp"

#include <cassert>

static_allocator &static_allocator::instance(uint8_t *data, size_t size) {
  static static_allocator instance = static_allocator(data, size);
  return instance;
}

void *static_allocator::allocate(size_t size) {
  size_free -= size;
  assert(size_free >= 0);
  return data + size_free;
}

void static_allocator::deallocate(void *ptr, size_t size) {
  assert((data + size_free) == ptr);
  size_free += size;
  assert(size_free <= size_total);
}
