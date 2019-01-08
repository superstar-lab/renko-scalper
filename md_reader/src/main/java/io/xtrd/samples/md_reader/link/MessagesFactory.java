package io.xtrd.samples.md_reader.link;

import biz.onixs.fix.dictionary.Version;
import biz.onixs.fix.parser.Group;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import biz.onixs.fix.tag.Tag;

public class MessagesFactory {

    public Message getLogon(String username, String password, int heartbeat) {
        Message result = Message.create(FIX44.MsgType.Logon, Version.FIX44);
        result.set(Tag.Username, username);
        result.set(Tag.Password, password);
        result.set(Tag.HeartBtInt, heartbeat);
        result.set(Tag.ResetSeqNumFlag, "Y");

        return result;
    }

    public Message getSecurityList(String id, String exchangeName) {
        Message result = Message.create(FIX44.MsgType.SecurityListRequest, Version.FIX44);

        result.set(Tag.SecurityReqID, id);
        result.set(Tag.SecurityListRequestType, FIX44.SecurityListRequestType.AllSecurities);
        result.set(Tag.SecurityExchange, exchangeName);

        return result;
    }

    public Message getMarketDataSubscribe(int id, int depth, String symbolName, String exchangeName) {
        Message result = Message.create(FIX44.MsgType.MarketDataRequest, Version.FIX44);

        result.set(Tag.MDReqID, id);
        result.set(Tag.SubscriptionRequestType, FIX44.SubscriptionRequestType.SnapshotUpdate);
        result.set(Tag.MDUpdateType, FIX44.MDUpdateType.Incremental);
        result.set(Tag.MarketDepth, depth);
        Group entries = result.setGroup(Tag.NoMDEntryTypes, 2);
        entries.set(Tag.MDEntryType, 0, FIX44.MDEntryType.Bid);
        entries.set(Tag.MDEntryType, 1, FIX44.MDEntryType.Offer);

        Group symbols = result.setGroup(Tag.NoRelatedSym, 1);
        symbols.set(Tag.Symbol, 0, symbolName);
        symbols.set(Tag.SecurityExchange, 0, exchangeName);

        return result;
    }

    public Message getMarketDataUnsubscribe(int id, String symbolName, String exchangeName) {
        Message result = Message.create(FIX44.MsgType.MarketDataRequest, Version.FIX44);

        result.set(Tag.MDReqID, id);
        result.set(Tag.SubscriptionRequestType, FIX44.SubscriptionRequestType.Unsubscribe);
        result.set(Tag.MDUpdateType, FIX44.MDUpdateType.Incremental);
        Group entries = result.setGroup(Tag.NoMDEntryTypes, 2);
        entries.set(Tag.MDEntryType, 0, FIX44.MDEntryType.Bid);
        entries.set(Tag.MDEntryType, 1, FIX44.MDEntryType.Offer);

        Group symbols = result.setGroup(Tag.NoRelatedSym, 1);
        symbols.set(Tag.Symbol, 0, symbolName);
        symbols.set(Tag.SecurityExchange, 0, exchangeName);

        return result;
    }
}
