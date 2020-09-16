find_package(FlatBuffers REQUIRED)

function(FLATBUFFERS_GENERATE_C_HEADERS_EX Name)
  set(FLATC_OUTPUTS)
  foreach(FILE ${ARGN})
    get_filename_component(FLATC_OUTPUT ${FILE} NAME_WE)
    set(FLATC_OUTPUT
      "${CMAKE_CURRENT_BINARY_DIR}/${FLATC_OUTPUT}_generated.h")
    list(APPEND FLATC_OUTPUTS ${FLATC_OUTPUT})

    add_custom_command(OUTPUT ${FLATC_OUTPUT}
      COMMAND ${FLATBUFFERS_FLATC_EXECUTABLE}
      ARGS -c -o "${CMAKE_CURRENT_BINARY_DIR}/" --gen-object-api ${FILE}
      DEPENDS ${FILE}
      COMMENT "Building C++ header for ${FILE}"
      WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR})
  endforeach()
  set(${Name}_OUTPUTS ${FLATC_OUTPUTS} PARENT_SCOPE)
endfunction()

include_directories(${CMAKE_CURRENT_BINARY_DIR})
set(HEADER_LIST "../include/game/game.hpp")

flatbuffers_generate_c_headers_ex(game game.fbs)
add_library(game SHARED 
  game.cpp static_allocator.cpp simple_game.cpp ${game_OUTPUTS})
target_include_directories(game PUBLIC ../include)
target_compile_options(game PRIVATE
  $<$<CXX_COMPILER_ID:MSVC>:/W4 /WX>
  $<$<NOT:$<CXX_COMPILER_ID:MSVC>>:-Wall -Wextra -pedantic -Werror>
)
