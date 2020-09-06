cmake_minimum_required(VERSION 3.10)
set(CMAKE_CXX_STANDARD 11)
set(Boost_USE_STATIC_LIBS ON)

project(simple-game)

add_subdirectory(game)
add_subdirectory(platform/qt5)
