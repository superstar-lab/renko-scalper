#include "Utils.hpp"
#include <cstdlib>
#include <stdexcept>

std::vector <std::string> simple_split(std::string const & str, std::string const & delimiter) {
    std::vector <std::string> ret;

    auto const delimiter_length = delimiter.length();

    if (delimiter_length == 0) throw std::runtime_error { "unable to split on empty delimiter" };

    size_t start = 0;
    size_t end   = 0;

    while ((end = str.find(delimiter, start)) != std::string::npos) {
        ret.emplace_back(str.substr(start, end-start));
        start = end + delimiter_length;
    }   

    ret.emplace_back(str.substr(start, end));

    return ret;
}
