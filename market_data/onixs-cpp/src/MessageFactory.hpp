#pragma once

#include "shortcuts.hpp"

class MessageFactory {
public:
    static Message security_list (
        string exchange_name,
        string id = to_string( AppCore::instance().get_time_based_id() ) );

    static Message logon ();

    static Message subscribe_market_data (
        string id,
        const vector<exchange_sym_pair_t> &x_sym_pairs,
        uint16_t book_depth = AppCore::instance().get_book_depth() );
};
