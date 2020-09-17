#include <chrono>
#include <iostream>
#include <type_traits>

struct point {
  static constexpr char name[] = "point";
};
struct rectangle {
  static constexpr char name[] = "rectangle";
};
struct circle {
  static constexpr char name[] = "circle";
};

struct shape_base {
  size_t index = 0;
};

template <size_t I, typename T, typename... Ts> union shape_union {
  T value;
  shape_union<I + 1, Ts...> next;
};

template <size_t I, typename T> union shape_union<I, T> { T value; };

template <typename F, typename S, size_t I = 0> struct index_of {
  static constexpr size_t value = I;
};

template <typename F, typename... Ts>
struct index_of<F, shape_union<0, F, Ts...>> {
  static constexpr size_t value = 0;
};

template <size_t I, typename F, typename T, typename... Ts>
struct index_of<F, shape_union<I, T, Ts...>> {
  static constexpr size_t value =
      index_of<F, shape_union<I + 1, Ts...>, I + 1>::value;
};

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
  uint32_t operator()(point const &) { return 5; }
  uint32_t operator()(rectangle const &) { return 10; }
};

template <size_t I, typename... Ts>
uint32_t __visit_impl(size_t i, shape_union<I, Ts...> storage,
                      shape_visitor visitor) {
  return (i == I) ? visitor(storage.value)
                  : __visit_impl(i, storage.next, visitor);
}

template <size_t I, typename T>
uint32_t __visit_impl(size_t i, shape_union<I, T> storage,
                      shape_visitor visitor) {
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
uint32_t visit(shape<Ts...> const &shape, shape_visitor visitor) {
  return __visit_impl(shape.index, shape.storage, visitor);
}

shape<point, rectangle> random_shape() {
  shape<point, rectangle> s;
  if ((rand() & 2) == 0) {
    s = point{};
  } else {
    s = rectangle{};
  }
  return s;
}

struct dynshape {
  virtual ~dynshape() = default;
  virtual uint32_t get() = 0;
};

struct dynpoint : dynshape {
  uint32_t get() override { return 5; }
};
struct dynrectangle : dynshape {
  uint32_t get() override { return 10; }
};

dynshape *random_dynshape() {
  dynshape *s;
  if ((rand() & 2) == 0) {
    s = new dynpoint();
  } else {
    s = new dynrectangle();
  }
  return s;
}

int main() {
  constexpr auto times = 1000;
  constexpr auto size = 100000;
  uint32_t acc = 0;
  uint32_t dt = 0;
  for (auto _ = 0; _ != times; ++_) {
#if TVIRTUAL
#define testname "virtual"
    dynshape *s[size];
    for (auto i = 0; i != size; ++i)
      s[i] = random_dynshape();

    auto start = std::chrono::steady_clock::now();
    for (auto i = 0; i != size; ++i) {
      acc += s[i]->get();
    }
    auto end = std::chrono::steady_clock::now();
    dt += std::chrono::duration_cast<std::chrono::nanoseconds>(end - start)
              .count();

    for (auto i = 0; i != size; ++i)
      delete s[i];
#endif
#if TSTATIC
#define testname "static"
    auto start = std::chrono::steady_clock::now();
    for (auto i = 0; i != size; ++i) {
      if ((rand() & 2) == 0) {
        acc += 5;
      } else {
        acc += 10;
      }
    }
    auto end = std::chrono::steady_clock::now();
    dt += std::chrono::duration_cast<std::chrono::nanoseconds>(end - start)
              .count();
#endif
#if TVISITOR
#define testname "visitor"
    auto start = std::chrono::steady_clock::now();
    for (auto i = 0; i != size; ++i) {
      acc += visit(random_shape(), shape_visitor{});
    }
    auto end = std::chrono::steady_clock::now();
    dt += std::chrono::duration_cast<std::chrono::nanoseconds>(end - start)
              .count();
#endif
  }
  std::cout << testname << ":" << acc << ":" << dt << std::endl;
  return acc;
  //  {
  //    shape<rectangle> s;
  //    std::cout << s.storage.value.name << std::endl;
  //  }
  //  {
  //    shape<point, rectangle> s;
  //    std::cout << s.storage.value.name << std::endl;
  //    std::cout << s.storage.next.value.name << std::endl;
  //  }
  //  {
  //    index_of<point, shape_union<0, point, rectangle>> index;
  //    std::cout << index.value << std::endl;
  //  }
  //  {
  //    index_of<rectangle, shape_union<0, point, rectangle>> index;
  //    std::cout << index.value << std::endl;
  //  }
  //  {
  //    shape<point, rectangle> s;
  //    s = point{};
  //    std::cout << s.index << ":" << visit(s, shape_visitor{}) << std::endl;
  //  }
  //  {
  //    shape<point, rectangle> s;
  //    s = rectangle{};
  //    std::cout << s.index << ":" << visit(s, shape_visitor{}) << std::endl;
  //  }
  //   {
  //     shape<point, rectangle> s;
  //     s = rectangle{};
  //   }
  //   {
  //     shape<point, rectangle, circle> s;
  //     s = rectangle{};
  //   }
  // return 0;
}
