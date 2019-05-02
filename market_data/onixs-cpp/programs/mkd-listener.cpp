#include "shortcuts.hpp"
#include "Listener.hpp"
#include "Constants.hpp"
#include "MessageFactory.hpp"

#include <unistd.h>             // sleep

int main (int argc, char *argv[]) {
    clog << "XTRD sample market data listener using OnixS FIX Engine library"
         << endl << endl;

    if (argc < 2) {
        cerr << "USAGE: " << argv[0] << " <path to config>" << endl;
        return 1;
    }

    try {
        auto &app = AppCore::init(argv);

        EngineSettings settings;

        // initializing OnixS library

        settings.dictionaryFile( app.get_onixs_dictionary_file() );
        settings.dialectString( app.get_onixs_dialect_id() );
        settings.licenseStore( app.get_onixs_fix_engine_license_store() );

        Engine::init(settings);

        // initializing connection with XTRD server

        Listener listener;
        Session session(
            app.get_sender_comp_id(),
            app.get_target_comp_id(),
            Const::XTRADE_FIX_VERSION,
            &listener
        );

        auto logon_msg = MessageFactory::logon();
        session.logonAsInitiator(
            app.get_fix_host(),
            app.get_fix_port(),
            app.get_heartbeat_interval(),
            &logon_msg,

            // reset seq num flag set to 'Y'
            true);

        uint32_t countdown = app.get_countdown_value("5");

        // if countdown not set - user can terminate app with Ctrl-C
        if (countdown < 1) {
            while (true) {
                sleep(1);
            }
        }
        else {
            while (countdown > 0) {
                sleep(1);
                countdown--;
            }
        }

        session.logout("The session is disconnected by client");
        session.shutdown();

        Engine::shutdown();
    }
    catch (const std::exception& ex) {
        cerr << "Exception caught: " << ex.what() << endl;
        return 1;
    }

    return 0;
}
