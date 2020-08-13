#ifndef XTRD_QUICKFIX_DEMO_APP_HPP
#define XTRD_QUICKFIX_DEMO_APP_HPP

#include "quickfix/Application.h"
#include "quickfix/MessageCracker.h"
#include "quickfix/SessionSettings.h"
#include "Subscription.hpp"
#include <vector>

class XTRDQuickFixDemoApp : public FIX::NullApplication, FIX::MessageCracker {
    public:

    FIX::SessionSettings const & settings;

    XTRDQuickFixDemoApp(FIX::SessionSettings const &);

    virtual void onLogon(FIX::SessionID const &) override;
    virtual void toAdmin(FIX::Message &, FIX::SessionID const &) override;
    virtual void fromApp(FIX::Message const &, FIX::SessionID const &) override;

    virtual void onMessage(FIX44::MarketDataSnapshotFullRefresh const &, FIX::SessionID const &) override;
    virtual void onMessage(FIX44::MarketDataIncrementalRefresh const &, FIX::SessionID const &) override;

    void request_market_data(FIX::SessionID const &);

    private:

    std::vector <Subscription> get_session_subscriptions(FIX::SessionID const &) const;

};

#endif
