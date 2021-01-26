#include <array>
#include <cmath>
#include <iostream>

struct vector2f {
  std::array<float_t, 2> value;
};

struct velocity : vector2f {
  friend std::ostream &operator<<(std::ostream &os, const velocity &v) {
    os << "velocity";
    return os;
  }
};
struct position : vector2f {
  friend std::ostream &operator<<(std::ostream &os, const position &p) {
    os << "position";
    return os;
  }
};

template <typename C> struct components {
  void add(C component) { std::cout << component << std::endl; }
};

struct world : components<position>,
               components<velocity> {
  template <typename C, typename... Cs> void add(C component, Cs... args) {
    ::components<C>::add(component);
    add(args...);
  }

  template <typename C> void add(C component) {
    ::components<C>::add(component);
  }
};

int main() {
  world w;
  w.add(position{1.0f, 2.0f}, velocity{0.0f, 0.0f});
  w.update();
}
