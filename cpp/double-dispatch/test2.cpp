#include <chrono>
#include <iostream>
#include <type_traits>
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

// struct shape_accessor {
//  template <size_t I, typename F, typename T, typename... Ts>
//  static F &get(__shape<I, T, Ts...> &s) {
//    return shape_accessor::get<I + 1, F>(s.next);
//  }
//
//  template <size_t I, typename F, typename... Ts>
//  static F &get(__shape<I, F, F, Ts...> &s) {
//    return s.value.value;
//  }
//
//  template <size_t I, typename F> static F &get(__shape<I, F> &s) {
//    return s.value.value;
//  }
//};

// template <size_t I, typename F> struct shape_accessor {
//  template <typename... Ts>
//  static shape_value<I, F> &get(__shape<I, F, Ts...> &s) {
//    return s.value;
//  }
//
//  template <size_t If, typename... Ts>
//  static shape_value<I, F> &get(__shape<I, Ts...> &s) {
//    return shape_accessor<I, F>::get(s);
//  }
//};
//
template <typename F, typename... Ts>
void set_shape(shape<Ts...> &s, F &&value) {
  __set_shape_impl(s.shapes, value);
}

template <size_t I, typename F, typename... Ts>
void __set_shape_impl(__shape<I, F, Ts...> &s, F &&value) {
  s.value = std::move(value);
}

template <size_t I, typename F, typename... Ts>
void __set_shape_impl(__shape<I, Ts...> &s, F &&value) {
  __set_shape_impl(s.next, value);
}

// void set_shape(shape<point, rectangle, line, circle> &s, rectangle &&value) {
//  s.shapes.next.value = std::move(value);
//}

shape<point, rectangle, line, circle> make_random_shape() {
  auto i = rand() % 4;
  shape<point, rectangle, line, circle> s;
  switch (i) {
  case 0:
    set_shape(s, point{});
    s.shapes.value = point{};
    break;
  case 1:
    set_shape(s, rectangle{});
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

constexpr auto times = 1000;
constexpr auto size = 10000;
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
int main() {
  uint32_t acc = 0;
  acc += test_visitor2_dispatch();
  return acc;
}
