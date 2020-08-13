#include "XTRDQuickFixDemoApp.hpp"
#include <iostream>
#include <string>
#include <cassert>
#include "quickfix/fix44/MarketDataRequest.h"
#include "quickfix/fix44/MarketDataSnapshotFullRefresh.h"
#include "quickfix/fix44/MarketDataIncrementalRefresh.h"
#include "quickfix/Session.h"
#include "Utils.hpp"
#include "CustomFIXFields.hpp"

XTRDQuickFixDemoApp::XTRDQuickFixDemoApp(FIX::SessionSettings const & settings_)
    : settings { settings_ } {
}

void XTRDQuickFixDemoApp::onLogon(FIX::SessionID const & session_id) {
    this->request_market_data(session_id);
}

void XTRDQuickFixDemoApp::toAdmin(FIX::Message & message, FIX::SessionID const & session_id) {
    // If the Logon message is being sent, insert credentials from config file into it
    if (message.getHeader().getField(FIX::FIELD::MsgType) == FIX::MsgType_Logon) {
        auto const & session_settings = this->settings.get(session_id);
        message.setField(FIX::Username(session_settings.getString("XTRDUsername")));
        message.setField(FIX::Password(session_settings.getString("XTRDPassword")));
        // request a reset of MsgSeqNum
        message.setField(FIX::ResetSeqNumFlag(true));
    }
}

void XTRDQuickFixDemoApp::fromApp(FIX::Message const & message, FIX::SessionID const & session_id) {
    this->crack(message, session_id);
}

std::vector <Subscription> XTRDQuickFixDemoApp::get_session_subscriptions(FIX::SessionID const & session_id) const {
    std::vector <Subscription> ret;
    auto const & session_settings = this->settings.get(session_id);
    auto const & subscriptions_config = session_settings.getString("XTRDSubscriptions");

    assert(subscriptions_config.length() > 0 && "Config value XTRDSubscriptions has nonzero length");

    for (auto const & el : simple_split(subscriptions_config, ",")) {
        auto const single_subscription = simple_split(el, ":");
        assert(single_subscription.size() == 2 && "Config value XTRDSubscriptions contains correct data");
        Subscription sub { single_subscription[0], single_subscription[1] };
        ret.push_back(sub);
    }

    return ret;
}

void XTRDQuickFixDemoApp::request_market_data(FIX::SessionID const & session_id) {
    FIX44::MarketDataRequest message(
        FIX::MDReqID("XTRD_MD_REQ_1"),
        FIX::SubscriptionRequestType(FIX::SubscriptionRequestType_SNAPSHOT_PLUS_UPDATES),
        FIX::MarketDepth(0)
    );

    message.set(FIX::MDUpdateType(FIX::MDUpdateType_INCREMENTAL_REFRESH));

    {
        FIX44::MarketDataRequest::NoMDEntryTypes md_entry_types_grp;

        md_entry_types_grp.set(FIX::MDEntryType_BID);
        message.addGroup(md_entry_types_grp);

        md_entry_types_grp.set(FIX::MDEntryType_OFFER);
        message.addGroup(md_entry_types_grp);

        md_entry_types_grp.set(FIX::MDEntryType_TRADE);
        message.addGroup(md_entry_types_grp);
    }

    FIX44::MarketDataRequest::NoRelatedSym related_sym_grp;

    for (auto const & sub : this->get_session_subscriptions(session_id)) {
        related_sym_grp.set(FIX::Symbol(sub.symbol));
        related_sym_grp.set(FIX::SecurityExchange(sub.exchange));
        message.addGroup(related_sym_grp);
    }

    FIX::Session::sendToTarget(message, session_id);
}

void XTRDQuickFixDemoApp::onMessage(FIX44::MarketDataSnapshotFullRefresh const & message, FIX::SessionID const &) {
    std::string const & exchange = message.getField(FIX::FIELD::SecurityExchange);
    std::string const & symbol = message.getField(FIX::FIELD::Symbol);
    std::string const & nomdentries = message.getField(FIX::FIELD::NoMDEntries);
    std::cout << "received MarketDataSnapshotFullRefresh for exchange: \""
              << exchange
              << "\" symbol: \""
              << symbol
              << "\" containing "
              << nomdentries
              << " entries"
              << std::endl;
}

void XTRDQuickFixDemoApp::onMessage(FIX44::MarketDataIncrementalRefresh const & message, FIX::SessionID const &) {
    auto no_md_entries_field = static_cast <FIX::NoMDEntries const &> (message.getFieldRef(FIX::FIELD::NoMDEntries));
    int const no_md_entries_value = no_md_entries_field.getValue();

    std::cout << "received MarketDataIncrementalRefresh for exchange: \""
              << message.getField(FIX::FIELD::SecurityExchange)
              << "\" symbol: \""
              << message.getField(FIX::FIELD::Symbol)
              << "\" with NoMDEntries = "
              << no_md_entries_value
              << std::endl;

    FIX44::MarketDataIncrementalRefresh::NoMDEntries grp;
    FIX::MDUpdateAction md_update_action;
    FIX::MDEntryType md_entry_type;
    FIX::MDEntryPx md_entry_px;
    FIX::MDEntrySize md_entry_size;
    FIX::AggressorSide aggressor_side;

    for (int iii = 1; iii <= no_md_entries_value; ++iii) {
        message.getGroup(iii, grp);
        grp.getField(md_update_action);
        grp.getField(md_entry_type);
        grp.getField(md_entry_px);
        std::cout << " ["
                  << grp.getField(FIX::FIELD::MDEntryDate)
                  << " "
                  << grp.getField(FIX::FIELD::MDEntryTime)
                  << "]"
                  << " MDUpdateAction: \""
                  << md_update_action.getValue()
                  << "\" MDEntryType: \""
                  << md_entry_type.getValue()
                  << "\" Price: \""
                  << md_entry_px.getString()
                  << "\"";

        if (grp.getFieldIfSet(md_entry_size)) {
            std::cout << " Size: \""
                      << md_entry_size.getString()
                      << "\"";
        }   

        if (grp.getFieldIfSet(aggressor_side)) {
            std::cout << " Aggressor Side: \""
                      << aggressor_side.getString()
                      << "\"";
        }   

        std::cout << std::endl;
    }
}
