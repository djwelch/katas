#ifndef SAVE_ALLOCATOR_HPP_436239eb_f283_477f_ac8f_8dc6bc8b3dcf
#define SAVE_ALLOCATOR_HPP_436239eb_f283_477f_ac8f_8dc6bc8b3dcf

#include <flatbuffers/flatbuffers.h>

class save_allocator : public flatbuffers::Allocator {
public:
  save_allocator(uint8_t *data, size_t size)
      : allocated(false), size_total(size), data(data) {}
  uint8_t *allocate(size_t size) final;
  void deallocate(uint8_t *, size_t size) final;

private:
  bool allocated;
  size_t size_total;
  uint8_t *data;
};

#endif
