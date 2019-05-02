#pragma once

#include <map>
#include <vector>
#include <utility>              // pair

#include "shortcuts.hpp"
#include "MessageFactory.hpp"

class Listener : public OnixS::FIX::ISessionListener {
    using subscription_id_t = string;

public:
    Listener ();
    virtual ~Listener ();

    // Is called when the application-level message is received from the
    // counterparty.
    virtual void onInboundApplicationMsg (Message& msg, Session* sn);

    virtual void onStateChange (
        SessionState::Enum new_state,
        SessionState::Enum prev_state,
        Session* sn);

    virtual void onError (
        ErrorReason::Enum reason,
        const std::string& description,
        Session* sn);

    virtual void onWarning (
        WarningReason::Enum reason,
        const std::string& description,
        Session* sn);

private:
    // for easy unsubscribe(... _subscription_id_for["HUOBI"]["ETH/USDT"] ...)
    map< exchange_name_t, map<symbol_t, subscription_id_t> >
        _subscription_id_for;

    void _process_security_list (Message &m, Session &s);
    void _pretty_print_snapshot (Message &m);
    void _pretty_print_incremental (Message &m);
};
