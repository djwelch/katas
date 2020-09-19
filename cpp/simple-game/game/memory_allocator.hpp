#ifndef MEMORY_ALLOCATOR_HPP_3765A2DC_B047_4D3E_8442_0827811D665E
#define MEMORY_ALLOCATOR_HPP_3765A2DC_B047_4D3E_8442_0827811D665E

#include "static_allocator.hpp"

#include <iostream>

template <typename T> struct memory_allocator {
  T *allocate(size_t size) {
    return static_cast<T *>(
        static_allocator::instance().allocate(size * sizeof(T)));
  }

  void deallocate(T *ptr, size_t size) {
    static_allocator::instance().deallocate(static_cast<void *>(ptr),
                                            size * sizeof(T));
  }
};

#endif
