# file(GLOB HEADER_LIST CONFIGURE_DEPENDS "${ModernCMakeExample_SOURCE_DIR}/include/modern/*.hpp"
set(HEADER_LIST "../include/game/game.hpp")
add_library(game game.cpp simple_game.cpp ${HEADER_LIST})

find_package(Boost COMPONENTS log log_setup REQUIRED)

target_include_directories(game PUBLIC ../include)
target_link_libraries(game PRIVATE Boost::log Boost::log_setup)

