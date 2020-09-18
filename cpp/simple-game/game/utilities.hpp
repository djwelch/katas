#ifndef UTILITIES_HPP_A4C82D9D_EBE9_49D7_A836_10DC0E5A9869
#define UTILITIES_HPP_A4C82D9D_EBE9_49D7_A836_10DC0E5A9869

#include "memory_allocator.hpp"
#include "objects.hpp"

#include <cmath>
#include <cstdint>

uint32_t to_uint32_t(float_t f) { return static_cast<unsigned int>(f + 0.5); }

int32_t to_int32_t(float_t f) { return static_cast<int>(f + 0.5); }

uint32_t to_uint32_t(game::object::color_t &color) {
  auto r = to_uint32_t(color.r() * 255);
  auto g = to_uint32_t(color.g() * 255);
  auto b = to_uint32_t(color.b() * 255);
  return r << 24 | g << 16 | b << 8 | 0xff;
}

int32_t clamp(int32_t val, int32_t min, int32_t max) {
  if (val < min)
    return min;
  if (val > max)
    return max;
  return val;
}

#endif
