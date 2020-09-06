#include <iostream>
#include <boost/log/core.hpp>
#include <boost/log/sinks/text_file_backend.hpp>
#include <boost/log/sources/severity_logger.hpp>
#include <boost/log/trivial.hpp>
#include <boost/log/utility/setup/file.hpp>
#include <boost/log/utility/setup/common_attributes.hpp>
#include <boost/log/utility/setup/console.hpp>

#include <game/game.hpp>

static void initialize_logging() {
  namespace keywords = boost::log::keywords;
  using namespace boost::log::trivial;
  boost::log::add_console_log(std::cout, keywords::format="[%TimeStamp%]: %Message%");
  auto sink = boost::log::add_file_log(
      keywords::file_name="simple-game.log",
      keywords::format="[%TimeStamp%]: %Message%");
  sink->locked_backend()->auto_flush();

  boost::log::add_common_attributes();
  boost::log::core::get()->set_filter(severity >= debug);

  boost::log::sources::severity_logger<severity_level> lg;
  BOOST_LOG_SEV(lg, info) << "Logging initialized";
}

Game::Game() {
  initialize_logging();
}

Game::~Game() {
}

