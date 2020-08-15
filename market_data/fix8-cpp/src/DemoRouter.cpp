#include "DemoRouter.hpp"
#include <iostream>
#include <cstddef> // size_t

DemoRouter::DemoRouter(DemoApp & session) : _session { session } {

}

bool DemoRouter::operator()(FIX8::XTRD::MarketDataSnapshotFullRefresh const * msg) const {
    std::cout << "FIX8DEMO: received MarketDataSnapshotFullRefresh for exchange: \""
              << msg->get<FIX8::XTRD::SecurityExchange>()->get()
              << "\" symbol: \""
              << msg->get<FIX8::XTRD::Symbol>()->get()
              << "\" containing "
              << msg->get<FIX8::XTRD::NoMDEntries>()->get()
              << " entries"
              << std::endl;

    return true;
}

bool DemoRouter::operator()(FIX8::XTRD::MarketDataIncrementalRefresh const * msg) const {
    std::cout << "FIX8DEMO: received MarketDataIncrementalRefresh for exchange: \""
              << msg->get<FIX8::XTRD::SecurityExchange>()->get()
              << "\" symbol: \""
              << msg->get<FIX8::XTRD::Symbol>()->get()
              << "\" with NoMDEntries = "
              << msg->get<FIX8::XTRD::NoMDEntries>()->get()
              << std::endl;

    // Extract data from the repeating group
    auto grp = msg->find_group<FIX8::XTRD::MarketDataIncrementalRefresh::NoMDEntries>();
    if (grp == nullptr) throw std::runtime_error { "failed to find group" };

    for (size_t iii = 0; iii < grp->size(); ++iii) {
        auto el = grp->get_element(iii);
        std::cout << " [";
        
        // no suitable operator<< 
        el->get<FIX8::XTRD::MDEntryDate>()->print(std::cout);

        std::cout << " ";

        // no suitable operator<< 
        el->get<FIX8::XTRD::MDEntryTime>()->print(std::cout);
        
        std::cout << "] "
                  << " MDUpdateAction: \""
                  << el->get<FIX8::XTRD::MDUpdateAction>()->get()
                  << "\" MDEntryType: \""
                  << el->get<FIX8::XTRD::MDEntryType>()->get()
                  << "\" Price: \""
                  << el->get<FIX8::XTRD::MDEntryPx>()->get()
                  << "\"";

        if (el->has<FIX8::XTRD::MDEntrySize>()) {
            std::cout << " Size: \""
                      << el->get<FIX8::XTRD::MDEntrySize>()->get()
                      << "\"";
        }

        if (el->has<FIX8::XTRD::AggressorSide>()) {
            std::cout << " Aggressor Side: \""
                      << el->get<FIX8::XTRD::AggressorSide>()->get()
                      << "\"";
        }

        std::cout << std::endl;
    }

    return true;
}
