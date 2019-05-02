#include "Listener.hpp"

Listener::Listener() {}

Listener::~Listener() {}

void Listener::onInboundApplicationMsg (Message& msg, Session* session) {
    auto &app = AppCore::instance();

    map<string, string> msg_desc = {
        { "0", "Heartbeat"    },
        { "y", "SecurityList" },
        { "W", "Snapshot"     },
        { "X", "Incremental"  },
    };

    clog << "Received " << msg_desc[ msg.type().toString() ]
         << "(type " << msg.type().toString() << ") " <<  endl;

    if (msg.type() == MsgType::SecurityList) {
        // subscribe for securities requested in config file
        _process_security_list(msg, *session);
    }
    else if (msg.type() == MsgType::MarketDataSnapshotFullRefresh) {
        _pretty_print_snapshot(msg);
    }
    else if (msg.type() == MsgType::MarketDataIncrementalRefresh) {
        _pretty_print_incremental(msg);
    }
}

void Listener::_pretty_print_snapshot (Message &msg) {
    string symbol   = msg.get(Tags::Symbol);
    string exchange = msg.get(Tags::SecurityExchange);

    auto bids_offers_grp = msg.getGroup(Tags::NoMDEntries);

    if (bids_offers_grp.size() == 0) {
        clog << "Book for symbol " << symbol
             << " on exchange " << exchange << " is empty"
             << endl << endl;
    }
    else {
        using price_t     = string;
        using quantity_t  = string;
        using book_line_t = pair<price_t, quantity_t>;

        // building simplified book
        vector<book_line_t> bids;
        vector<book_line_t> offers;

        for (auto &elem : bids_offers_grp) {
            auto type     = elem.get(Tags::MDEntryType);
            auto price    = elem.get(Tags::MDEntryPx);
            auto quantity = elem.get(Tags::MDEntrySize);

            if (type == MDEntryType::Bid) {
                bids.push_back( book_line_t(price, quantity) );
            }
            else if (type == MDEntryType::Offer) {
                offers.push_back( book_line_t(price, quantity) );
            }
        }

        std::sort(
            bids.begin(), bids.end(),
            [] (const book_line_t &a, const book_line_t &b) {
                // generous(more expensive) bids first
                return a.first > b.first;
            }
        );

        std::sort(
            offers.begin(), offers.end(),
            [] (const book_line_t &a, const book_line_t &b) {
                // cheaper offers first
                return a.first < b.first;
            }
        );

        clog << "Simplified Book for symbol " << symbol
             << " on exchange " << exchange << endl;

        clog << "Bids: " << endl;
        for (auto &b : bids) {
            clog << "  - price => " << b.first
                 << "; quantity => " << b.second << endl;
        }
        clog << endl;

        clog << "Offers: " << endl;
        for (auto &a : offers) {
            clog << "  - price => " << a.first
                 << "; quantity => " << a.second << endl;
        }
        clog << endl;
    }
}

void Listener::_pretty_print_incremental (Message &msg) {
    // human-readable names of tag values

    // 279 - MDUpdateAction
    map<string, string> action_desc = {
        { MDUpdateAction::New,    "New"    },
        { MDUpdateAction::Change, "Change" },
        { MDUpdateAction::Delete, "Delete" },
    };

    // 269 - MDEntryType
    map<string, string> entry_type_desc = {
        { MDEntryType::Bid,   "Bid"   },
        { MDEntryType::Offer, "Offer" },
        { MDEntryType::Trade, "Trade" },
    };

    string exchange = msg.get(Tags::SecurityExchange);
    string symbol   = msg.get(Tags::Symbol);

    // pretty print elements in incremental
    auto inc_grp = msg.getGroup(Tags::NoMDEntries);
    for (auto &elem : inc_grp) {
        string date   = elem.get(Tags::MDEntryDate);
        string time   = elem.get(Tags::MDEntryTime);

        string action = elem.get(Tags::MDUpdateAction);
        string type   = elem.get(Tags::MDEntryType);
        string price  = elem.get(Tags::MDEntryPx);

        clog << "Event: " << action_desc[action] << " "
             << entry_type_desc[type] << " with price " << price
             << " of " << symbol << " on " << exchange
             << " @@ " << date << " " << time
             << endl;
    }

    clog << endl;
}

void Listener::_process_security_list (Message &msg, Session &session) {
    auto &app = AppCore::instance();

    auto sym_white_list = app.get_symbols_list();

    // server responded with available security list for given exchange in
    // NoRelatedSym group
    vector< exchange_sym_pair_t > exch_sym_pairs;
    auto related_sym_grp = msg.getGroup(Tags::NoRelatedSym);
    for (auto &elem : related_sym_grp) {
        auto msg_exchange = elem.get(Tags::SecurityExchange).toString();
        auto msg_symbol   = elem.get(Tags::Symbol).toString();

        clog << "Server responded that symbol " << msg_symbol
             << " is listed on exchange " << msg_exchange << endl;

        if (sym_white_list.count("*") or sym_white_list.count(msg_symbol)) {
            exch_sym_pairs.push_back(
                exchange_sym_pair_t(msg_exchange, msg_symbol)
            );
        }
        else {
            clog << "Symbol " << msg_symbol << " on exchange " << msg_exchange
                 << " will not be subscribed since it was not requested"
                 << endl << endl;
        }
    }

    if (exch_sym_pairs.size() > 0) {
        // this request ID will be used in unsubscribe messsages later on
        string req_id = to_string( app.get_time_based_id() );

        for (auto &ex_sym : exch_sym_pairs) {
            clog << "Subscribing data stream for symbol '"
                 << ex_sym.second << "'" << " on exchange '"
                 << ex_sym.first << "'" << endl << endl;

            _subscription_id_for[ex_sym.first][ex_sym.second] = req_id;
        }

        Message msg = MessageFactory::subscribe_market_data(
            req_id,
            exch_sym_pairs,
            app.get_book_depth()
        );

        session.send(&msg);
    }
}

void Listener::onStateChange (
    SessionState::Enum new_state,
    SessionState::Enum prev_state,
    Session* session)
{
    // list securities on exchanges requested in config file
    if (new_state == SessionState::Active) {
        clog << "Session established" << endl;

        for (auto exchange_name : AppCore::instance().get_exchanges_list()) {
            clog << "Requesting for instruments list on exchange "
                 << exchange_name << endl << endl;

            auto msg = MessageFactory::security_list(exchange_name);
            session->send(&msg);
        }
    }
}

void Listener::onError (
    ErrorReason::Enum reason,
    const std::string& description,
    Session* session)
{
    throw runtime_error("Session-level error:" + description);
}

void Listener::onWarning (
    WarningReason::Enum reason,
    const std::string& description,
    Session* session)
{
    cerr << "\nSession-level warning:" << description << endl;
}
