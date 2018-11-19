package io.xtrd.samples.md_reader.link;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import biz.onixs.fix.tag.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Listener implements Session.InboundApplicationMessageListener {
    private final Logger logger = LoggerFactory.getLogger(Listener.class);
    @Override
    public void onInboundApplicationMessage(Object o, Session.InboundApplicationMessageArgs args) {
        Message msg = args.getMsg();
        if(FIX44.MsgType.MarketDataSnapshotFullRefresh.equals(msg.getType())) {
            processSnapshot(msg);
        } else if (FIX44.MsgType.MarketDataIncrementalRefresh.equals(msg.getType())) {
            processIncrementalRefresh(msg);
        }
    }

    private void processSnapshot(Message msg) {
        String symbolName = msg.get(Tag.Symbol);
        String exchangeName = msg.get(Tag.SecurityExchange);
        int eventsNum = msg.getInteger(Tag.NoMDEntries);
        if(logger.isDebugEnabled()) logger.debug("Snapshot for {}/{} with {} levels", symbolName, exchangeName, eventsNum);
    }

    private void processIncrementalRefresh(Message msg) {
        int eventsNum = msg.getInteger(Tag.NoMDEntries);
        if(logger.isDebugEnabled()) logger.debug("IncrementalRefresh with {} levels", eventsNum);
    }
}
