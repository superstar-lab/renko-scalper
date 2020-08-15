#include "DemoApp.hpp"
#include <iostream>
#include <stdexcept> // std::runtime_error
#include "Utils.hpp"

DemoApp::DemoApp(
    FIX8::F8MetaCntx const & ctx,
    FIX8::SessionID const & sid,
    FIX8::Persister * persist,
    FIX8::Logger * logger,
    FIX8::Logger * plogger
) : FIX8::Session(ctx, sid, persist, logger, plogger), _router(*this) {

}

FIX8::Message * DemoApp::generate_logon(unsigned int const heartbeat_interval, FIX8::f8String const davi) {
    FIX8::Message * msg = FIX8::Session::generate_logon(heartbeat_interval, davi);

    // Add username and password to the logon message
    {
        std::string xtrd_username;
        std::string xtrd_password;

        auto ses = this->_sf->_ses;

        if (!ses->GetAttr("xtrd_username", xtrd_username))
            throw std::runtime_error { "xtrd_username not found in session xml" };

        if (!ses->GetAttr("xtrd_password", xtrd_password))
            throw std::runtime_error { "xtrd_password not found in session xml" };

        *msg << new FIX8::XTRD::Username(xtrd_username);
        *msg << new FIX8::XTRD::Password(xtrd_password);
    }

    return msg;
}

void DemoApp::state_change(FIX8::States::SessionStates const before, FIX8::States::SessionStates const after) {
    std::string logmsg = "Application changed state: ";
    logmsg += this->get_session_state_string(before);
    logmsg += " => ";
    logmsg += this->get_session_state_string(after);
    this->log(logmsg, FIX8::Logger::Level::Info);

    // Request market data after logging in
    if (before == FIX8::States::st_logon_received and after == FIX8::States::st_continuous) {
        std::cout << "Successfully logged in, requesting market data" << std::endl;
        this->request_market_data();
    }
}

void DemoApp::request_market_data() {
    this->log("Requesting market data", FIX8::Logger::Level::Info);

    // Get market depth from config
    std::string xtrd_market_depth;

    if (!this->_sf->_ses->GetAttr("xtrd_market_depth", xtrd_market_depth))
        throw std::runtime_error { "xtrd_market_depth not found in session xml" };

    int market_depth = std::stoi(xtrd_market_depth);

    // Construct a request
    auto req = new FIX8::XTRD::MarketDataRequest();

    *req << new FIX8::XTRD::MDReqID("FIX8DEMO_REQ_1")
         << new FIX8::XTRD::SubscriptionRequestType(FIX8::XTRD::SubscriptionRequestType_SNAPSHOTUPDATE)
         << new FIX8::XTRD::MarketDepth(market_depth)
         << new FIX8::XTRD::MDUpdateType(FIX8::XTRD::MDUpdateType_INCREMENTAL);

    // Populate the entry types group
    {
        constexpr std::array entry_types {
            FIX8::XTRD::MDEntryType_BID,
            FIX8::XTRD::MDEntryType_OFFER,
            FIX8::XTRD::MDEntryType_TRADE
        }; 

        *req << new FIX8::XTRD::NoMDEntryTypes(entry_types.size());
        auto grp = req->find_group<FIX8::XTRD::MarketDataRequest::NoMDEntryTypes>();
        if (grp == nullptr) throw std::runtime_error { "failed to find group" };

        for (auto const & type : entry_types) {
            auto grp_element = grp->create_group();
            *grp_element << new FIX8::XTRD::MDEntryType(type);
            *grp << grp_element;
        }
    }

    // Populate the symbols group
    {
        auto subs = this->get_subscriptions();

        *req << new FIX8::XTRD::NoRelatedSym(subs.size());
        auto grp = req->find_group<FIX8::XTRD::MarketDataRequest::NoRelatedSym>();
        if (grp == nullptr) throw std::runtime_error { "failed to find group" };
        
        for (auto const & sub : subs) {
            auto grp_element = grp->create_group();
            *grp_element << new FIX8::XTRD::SecurityExchange(sub.first);
            *grp_element << new FIX8::XTRD::Symbol(sub.second);
            *grp << grp_element;
        }

    }   

    this->send(req);
}

std::vector <std::pair<std::string, std::string>> DemoApp::get_subscriptions() const {
    std::vector <std::pair<std::string, std::string>> ret;

    // Get subscriptions from config
    std::string xtrd_subscriptions;

    if (!this->_sf->_ses->GetAttr("xtrd_subscriptions", xtrd_subscriptions))
        throw std::runtime_error { "xtrd_subscriptions not found in session xml" };

    for (auto const & el : simple_split(xtrd_subscriptions, ",")) {
        auto const single_subscription = simple_split(el, ":");
        if (single_subscription.size() != 2)
            throw std::runtime_error { "config value xtrd_subscriptions contains incorrect data" };
        ret.emplace_back(single_subscription[0], single_subscription[1]);
    }

    return ret;
}

bool DemoApp::handle_application(unsigned int const seqnum, FIX8::Message const *& msg) {
    return this->enforce(seqnum, msg) || msg->process(this->_router);
}
