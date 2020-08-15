#ifndef DEMO_ROUTER_HPP
#define DEMO_ROUTER_HPP

#include <fix8/f8includes.hpp>
#include "XTRD_types.hpp"
#include "XTRD_router.hpp"
#include "XTRD_classes.hpp"

class DemoApp;

class DemoRouter : public FIX8::XTRD::XTRD_Router {
    public:

    DemoRouter(DemoApp & session);

    virtual bool operator()(FIX8::XTRD::MarketDataSnapshotFullRefresh const * msg) const override;
    virtual bool operator()(FIX8::XTRD::MarketDataIncrementalRefresh const * msg) const override;

    private:

    DemoApp & _session;
};

#endif
