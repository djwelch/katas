cmake_minimum_required(VERSION 3.10)
#set(CMAKE_C_COMPILER /usr/bin/clang)
#set(CMAKE_CXX_COMPILER /usr/bin/clang++)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

project(entity-component-system)
set(CMAKE_CXX_FLAGS_RELEASEA "-O3 -g --save-temps -fverbose-asm")
set(CMAKE_BUILD_TYPE ReleaseA)

add_executable(entity-component-system src/main.cpp)
