cmake_minimum_required(VERSION 3.10)
set(CMAKE_CXX_STANDARD 11)

project(simple-game)
set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

set(CMAKE_CXX_FLAGS -pthread)
set(Boost_USE_STATIC_LIBS ON)

find_package(Qt5 COMPONENTS Widgets REQUIRED)
find_package(Boost COMPONENTS log log_setup REQUIRED)
# find_package(Threads REQUIRED)

add_executable(simple-game src/main.cpp)
# Threads::Threads
target_link_libraries(simple-game Boost::log Boost::log_setup  Qt5::Widgets)
