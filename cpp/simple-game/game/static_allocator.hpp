#ifndef STATIC_ALLOCATOR_HPP_B1C4793B_08DD_4860_9A04_B231987F8DF5
#define STATIC_ALLOCATOR_HPP_B1C4793B_08DD_4860_9A04_B231987F8DF5

#include <cstddef>
#include <cstdint>

class static_allocator {
public:
  static static_allocator &instance(uint8_t *data = nullptr, size_t size = 0);
  void *allocate(size_t size);
  void deallocate(void *, size_t size);

private:
  static_allocator(uint8_t *data, size_t size)
      : size_free(size), size_total(size), data(data) {}

private:
  size_t size_free;
  size_t size_total;
  uint8_t *data;
};


#endif
