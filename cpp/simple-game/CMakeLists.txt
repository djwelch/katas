cmake_minimum_required(VERSION 3.10)
set(CMAKE_C_COMPILER /usr/bin/clang)
set(CMAKE_CXX_COMPILER /usr/bin/clang++)
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
project(simple-game)

add_subdirectory(game)
add_subdirectory(platform/x11)
