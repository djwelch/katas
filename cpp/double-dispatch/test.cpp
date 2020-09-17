#include <chrono>
#include <iostream>
#include <type_traits>
#include <variant>

int test_visitor2_dispatch();
struct point {
  static constexpr char name[] = "point";
};
struct rectangle {
  static constexpr char name[] = "rectangle";
};
struct circle {
  static constexpr char name[] = "circle";
};
struct line {
  static constexpr char name[] = "line";
};

struct shape_base {
  size_t index = 0;
};

template <size_t I, typename T, typename... Ts> union shape_union {
  T value;
  shape_union<I + 1, Ts...> next;
};

template <size_t I, typename T> union shape_union<I, T> { T value; };

template <size_t I, typename F, typename T, typename... Ts>
F &__set_impl(shape_base &s, shape_union<I, T, Ts...> &storage, F &value) {
  return __set_impl(s, storage.next, value);
}

template <size_t I, typename F, typename... Ts>
F &__set_impl(shape_base &s, shape_union<I, F, Ts...> &storage, F &value) {
  s.index = I;
  storage.value = value;
  return storage.value;
}

struct shape_visitor {
  uint32_t operator()(point const &) { return 1; }
  uint32_t operator()(rectangle const &) { return 2; }
  uint32_t operator()(circle const &) { return 3; }
  uint32_t operator()(line const &) { return 4; }
};

struct shape_visitor2 {
  uint32_t n;
  void operator()(point const &) { n = 1; }
  void operator()(rectangle const &) { n = 2; }
  void operator()(circle const &) { n = 3; }
  void operator()(line const &) { n = 4; }
};

template <size_t I, typename... Ts>
void __visit_impl(size_t i, shape_union<I, Ts...> storage,
                  shape_visitor2 &visitor) {
  return (i == I) ? visitor(storage.value)
                  : __visit_impl(i, storage.next, visitor);
}

template <size_t I, typename T>
void __visit_impl(size_t i, shape_union<I, T> storage,
                  shape_visitor2 &visitor) {
  return visitor(storage.value);
}

template <typename... Ts>
struct shape : shape_base {
  template <typename T> T &operator=(T &&value) {
    return __set_impl(*this, storage, value);
  }
  shape_union<0, Ts...> storage;
};

template <typename... Ts>
void my_visit(shape<Ts...> const &shape, shape_visitor2 &visitor) {
  return __visit_impl(shape.index, shape.storage, visitor);
}

std::variant<point, rectangle, circle, line> random_variant_shape() {
  auto i = rand() % 4;
  switch (i) {
  case 0: {
    std::variant<point, rectangle, circle, line> s = point{};
    return s;
  }
  case 1: {
    std::variant<point, rectangle, circle, line> s = rectangle{};
    return s;
  }
  case 2: {
    std::variant<point, rectangle, circle, line> s = line{};
    return s;
  }
  default: {
    std::variant<point, rectangle, circle, line> s = circle{};
    return s;
  }
  }
}

shape<point, rectangle, circle, line> random_visitor_shape() {
  shape<point, rectangle, circle, line> s;
  auto i = rand() % 4;
  switch (i) {
  case 0:
    s = point{};
    break;
  case 1:
    s = rectangle{};
    break;
  case 2:
    s = line{};
    break;
  default:
    s = circle{};
    break;
  }
  return s;
}

uint32_t random_static_shape() {
  auto i = rand() % 4;
  switch (i) {
  case 0:
    return 1;
  case 1:
    return 2;
  case 3:
    return 4;
  default:
    return 3;
  }
}

struct dynshape {
  virtual ~dynshape() = default;
  virtual uint32_t get() = 0;
};

struct dynpoint : dynshape {
  uint32_t get() override { return 1; }
};
struct dynrectangle : dynshape {
  uint32_t get() override { return 2; }
};
struct dyncircle : dynshape {
  uint32_t get() override { return 3; }
};
struct dynline : dynshape {
  uint32_t get() override { return 4; }
};

dynshape *random_dynamic_shape() {
  auto i = rand() % 4;
  switch (i) {
  case 0:
    return new dynpoint();
  case 1:
    return new dynrectangle();
  case 3:
    return new dynline();
  default:
    return new dyncircle();
  }
}

static uint32_t times = 1000;
static uint32_t size = 10000;

int test_variant_dispatch() {
  uint32_t acc = 0;
  uint32_t dt = 0;
  auto v = shape_visitor2{0};
  auto start = std::chrono::steady_clock::now();
  for (auto _ = 0; _ != times; ++_) {
    for (auto i = 0; i != size; ++i) {
      auto s = random_variant_shape();
      std::visit(v, s);
      acc += v.n;
    }
  }
  auto end = std::chrono::steady_clock::now();
  dt +=
      std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
  std::cout << "variant"
            << ":" << times * size << ":" << dt << std::endl;
  return acc;
}

int test_virtual_dispatch() {
  dynshape *s[size];
  uint32_t acc = 0;
  uint32_t dt = 0;
  for (auto i = 0; i != size; ++i)
    s[i] = random_dynamic_shape();
  auto start = std::chrono::steady_clock::now();
  for (auto _ = 0; _ != times; ++_) {

    for (auto i = 0; i != size; ++i) {
      acc += s[i]->get();
    }
  }
  auto end = std::chrono::steady_clock::now();
  dt +=
      std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
  for (auto i = 0; i != size; ++i)
    delete s[i];
  std::cout << "virtual"
            << ":" << times * size << ":" << dt << std::endl;
  return acc;
}

int test_static_dispatch() {
  uint32_t acc = 0;
  uint32_t dt = 0;
  auto start = std::chrono::steady_clock::now();
  for (auto _ = 0; _ != times; ++_) {
    for (auto i = 0; i != size; ++i) {
      acc += random_static_shape();
    }
  }
  auto end = std::chrono::steady_clock::now();
  dt +=
      std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
  std::cout << "static"
            << ":" << times * size << ":" << dt << std::endl;
  return acc;
}

int test_visitor_dispatch() {
  uint32_t acc = 0;
  uint32_t dt = 0;
  auto v = shape_visitor2{};
  auto start = std::chrono::steady_clock::now();
  for (auto _ = 0; _ != times; ++_) {
    for (auto i = 0; i != size; ++i) {
      my_visit(random_visitor_shape(), v);
      acc += v.n;
    }
  }
  auto end = std::chrono::steady_clock::now();
  dt +=
      std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
  std::cout << "visitor"
            << ":" << times * size << ":" << dt << std::endl;
  return acc;
}


int main() {
  uint32_t acc = 0;
  acc += test_virtual_dispatch();
  acc += test_visitor_dispatch();
  acc += test_visitor2_dispatch();
  acc += test_static_dispatch();
  acc += test_variant_dispatch();
  return acc;
}

namespace visitor2 {

struct point {
  static constexpr char name[] = "point";
};

struct rectangle {
  static constexpr char name[] = "rectangle";
};

struct circle {
  static constexpr char name[] = "circle";
};

struct line {
  static constexpr char name[] = "line";
};

template <size_t I, typename T> struct shape_value {
  size_t index;
  T value;

  shape_value<I, T> &operator=(T &&val) {
    index = I;
    value = val;
    return *this;
  }
};

template <typename F, typename Ts...> struct shape_accessor {
  F &get(__shape<0, Ts...> &s) {
    return shape_accessor(s.next
  }
};

template <size_t I, typename T, typename... Ts> union __shape {
  size_t index;
  shape_value<I, T> value;
  __shape<I + 1, Ts...> next;
};

template <size_t I, typename T> union __shape<I, T> {
  size_t index;
  shape_value<I, T> value;
};

template <typename... Ts> union shape {
  size_t index;
  __shape<0, Ts...> shapes;
};

shape<point, rectangle, line, circle> make_random_shape() {
  auto i = rand() % 4;
  shape<point, rectangle, line, circle> s;
  switch (i) {
  case 0:
    s.shapes.value = point{};
    break;
  case 1:
    s.shapes.next.value = rectangle{};
    break;
  case 2:
    s.shapes.next.next.value = line{};
  default:
    s.shapes.next.next.next.value = circle{};
  }
  return s;
}

struct shape_visitor {
  uint32_t operator()(point const &) const { return 1; }
  uint32_t operator()(rectangle const &) const { return 2; }
  uint32_t operator()(circle const &) const { return 3; }
  uint32_t operator()(line const &) const { return 4; }
};

template <size_t I, typename... Ts>
uint32_t __visit_impl(shape_visitor const &visitor, __shape<I, Ts...> const &s,
                      size_t index) {
  if (index == I)
    return visitor(s.value.value);
  return __visit_impl(visitor, s.next, index);
}

template <size_t I, typename T>
uint32_t __visit_impl(shape_visitor const &visitor, __shape<I, T> const &s,
                      size_t index) {
  return visitor(s.value.value);
}

uint32_t visit(shape_visitor const &&visitor,
               shape<point, rectangle, line, circle> const &s) {
  return __visit_impl(visitor, s.shapes, s.index);
}

int test_visitor2_dispatch() {
  uint32_t acc = 0;
  uint32_t dt = 0;
  auto v = shape_visitor{};
  auto start = std::chrono::steady_clock::now();
  for (auto _ = 0; _ != times; ++_) {
    for (auto i = 0; i != size; ++i) {
      auto s = make_random_shape();
      acc += visit(shape_visitor{}, s);
    }
  }
  auto end = std::chrono::steady_clock::now();
  dt +=
      std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
  std::cout << "visitor2"
            << ":" << times * size << ":" << dt << std::endl;
  return acc;
}

} // namespace visitor2

int test_visitor2_dispatch() { return visitor2::test_visitor2_dispatch(); }
