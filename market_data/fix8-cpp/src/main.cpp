#include <fix8/f8includes.hpp>
#include "DemoApp.hpp"

int main() {
    FIX8::GlobalLogger::set_global_filename("global.log");

    FIX8::ReliableClientSession <DemoApp> app {
        FIX8::XTRD::ctx(),
        "etc/settings.xml",
        "XTRDDEMO2"
    };

    /*
    // Enable output from the FIX8 engine
    app.session_ptr()->control() |= FIX8::Session::print;
    */

    bool block = true;
    unsigned int next_send = 0;
    unsigned int next_receive = 0;

    app.start(block, next_send, next_receive);
    
    return 0;
}
