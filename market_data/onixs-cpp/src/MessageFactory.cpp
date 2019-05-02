#include "MessageFactory.hpp"

#include "Constants.hpp"

Message MessageFactory::security_list (
    string exchange_name,
    string id)
{
    Message msg(MsgType::SecurityListRequest, Const::XTRADE_FIX_VERSION);

    msg.set(Tags::SecurityReqID, id);
    msg.set(Tags::SecurityExchange, exchange_name);

    msg.set(
        Tags::SecurityListRequestType,
        SecurityListRequestType::AllSecurities);

    return msg;
}

Message MessageFactory::logon () {
    auto &app = AppCore::instance();

    Message logon_msg (Values::MsgType::Logon, Const::XTRADE_FIX_VERSION);
    logon_msg.set( Tags::Username, app.get_fix_username() );
    logon_msg.set( Tags::Password, app.get_fix_password() );

    return logon_msg;
}

Message MessageFactory::subscribe_market_data (
    string id,
    const vector<exchange_sym_pair_t> &x_sym_pairs,
    uint16_t book_depth)
{
    Message msg(MsgType::MarketDataRequest, ProtocolVersion::FIX_44);

    msg.set(Tags::MDReqID, id);

    msg.set(Tags::SubscriptionRequestType,
               SubscriptionRequestType::SnapshotUpdate);
    msg.set(Tags::MDUpdateType, MDUpdateType::Incremental);
    msg.set(Tags::MarketDepth, book_depth);

    Group entries = msg.setGroup(Tags::NoMDEntryTypes, 2);
    entries[0].set(Tags::MDEntryType, MDEntryType::Bid);
    entries[1].set(Tags::MDEntryType, MDEntryType::Offer);

    if (x_sym_pairs.size() > 0) {
        Group symbols = msg.setGroup(Tags::NoRelatedSym, x_sym_pairs.size());
        uint32_t i = 0;

        for (auto &x_sym : x_sym_pairs) {
            symbols[i].set(Tags::SecurityExchange, x_sym.first);
            symbols[i].set(Tags::Symbol, x_sym.second);
            i++;
        }
    }

    return msg;
}
