cmake_minimum_required(VERSION 3.10)
set(CMAKE_CXX_STANDARD 11)

project({})
set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt5 COMPONENTS Widgets REQUIRED)

add_executable({} src/main.cpp)

target_link_libraries({} Qt5::Widgets)
