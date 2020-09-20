set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS -pthread)
set(OpenGL_GL_PREFERENCE GLVND)

find_package(OpenGL COMPONENTS GLX REQUIRED)
find_package(Jack REQUIRED)
find_package(X11 REQUIRED)

add_executable(platform-x11 main.cpp)
target_include_directories(platform-x11 PRIVATE 
  $<TARGET_PROPERTY:game,INTERFACE_INCLUDE_DIRECTORIES>
  ${JACK_INCLUDE_DIR}
  ${X11_INCLUDE_DIR}
  ${OPENGL_INCLUDE_DIR})

target_link_libraries(platform-x11 PRIVATE
  ${JACK_LIBRARY}
  ${CMAKE_DL_LIBS}
  ${X11_LIBRARIES}
  rt
  OpenGL::GLX)
target_compile_options(game PRIVATE
  $<$<CXX_COMPILER_ID:MSVC>:/W4 /WX>
  $<$<NOT:$<CXX_COMPILER_ID:MSVC>>:-Wall -Wextra -pedantic -Werror>
)
