#ifndef DEMO_APP_HPP
#define DEMO_APP_HPP

#include <string>
#include <vector>
#include <utility> // std::pair
#include <fix8/f8includes.hpp>
#include "XTRD_types.hpp"
#include "XTRD_router.hpp"
#include "XTRD_classes.hpp"
#include "DemoRouter.hpp"

class DemoApp : public FIX8::Session {
    public:

    DemoApp(
        FIX8::F8MetaCntx const & ctx,
        FIX8::SessionID const & sid,
        FIX8::Persister * persist = nullptr,
        FIX8::Logger * logger = nullptr,
        FIX8::Logger * plogger = nullptr
    );

    virtual FIX8::Message * generate_logon(unsigned int const heartbeat_interval, FIX8::f8String const davi) override;
    virtual void state_change(FIX8::States::SessionStates const before, FIX8::States::SessionStates const after) override;
 
    bool handle_application(unsigned int const seqnum, FIX8::Message const *& msg);

    private:

    void request_market_data();
    std::vector <std::pair<std::string, std::string>> get_subscriptions() const;
    
    DemoRouter _router;
};

#endif
