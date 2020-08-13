#include <iostream>
#include "quickfix/NullStore.h"
#include "quickfix/SocketInitiator.h"
#include "quickfix/SessionSettings.h"
#include "XTRDQuickFixDemoApp.hpp"

int main() {
    try {
        FIX::SessionSettings settings { "etc/settings.conf" };
        XTRDQuickFixDemoApp app { settings };
        FIX::NullStoreFactory storeFactory;
        FIX::ScreenLogFactory logFactory { settings };

        FIX::SocketInitiator initiator {
            app,
            storeFactory,
            settings,
            /* logFactory, */
        };

        initiator.block();
    } catch (FIX::ConfigError const & e) {
        std::cerr << "FIX::ConfigError: " << e.what() << std::endl;
        return 1;
    } catch (std::exception const & e) {
        std::cerr << "std::exception: " << e.what() << std::endl;
        return 1;
    } catch (...) {
        std::cerr << "unknown exception" << std::endl;
        return 1;
    }

    return 0;
}
