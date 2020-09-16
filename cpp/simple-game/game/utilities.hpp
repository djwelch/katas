#ifndef UTILITIES_HPP_A4C82D9D_EBE9_49D7_A836_10DC0E5A9869
#define UTILITIES_HPP_A4C82D9D_EBE9_49D7_A836_10DC0E5A9869

#include <math.h>
#include <stdint.h>

#include "primitives.hpp"

uint32_t toUInt32(float_t f) { return static_cast<unsigned int>(f + 0.5); }

int32_t toInt32(float_t f) { return static_cast<int>(f + 0.5); }

uint32_t toUInt32(Color color) {
  auto r = toUInt32(color.r * 255);
  auto g = toUInt32(color.g * 255);
  auto b = toUInt32(color.b * 255);
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
