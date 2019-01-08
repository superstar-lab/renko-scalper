package io.xtrd.samples.md_reader.link;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.parser.Group;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import biz.onixs.fix.tag.Tag;
import io.xtrd.samples.md_reader.Symbol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Listener implements Session.InboundApplicationMessageListener {
    private ISecurityListener securityListener = null;

    private final Logger logger = LoggerFactory.getLogger(Listener.class);
    @Override
    public void onInboundApplicationMessage(Object o, Session.InboundApplicationMessageArgs args) {
        Message msg = args.getMsg();
        if(FIX44.MsgType.MarketDataSnapshotFullRefresh.equals(msg.getType())) {
            processSnapshot(msg);
        } else if (FIX44.MsgType.MarketDataIncrementalRefresh.equals(msg.getType())) {
            processIncrementalRefresh(msg);
        } else if (FIX44.MsgType.SecurityList.equals(msg.getType())) {
            processSecurityList(msg);
        }
    }

    private void processSnapshot(Message msg) {
        String symbolName = msg.get(Tag.Symbol);
        String exchangeName = msg.get(Tag.SecurityExchange);
        int eventsNum = msg.getInteger(Tag.NoMDEntries);
        if(logger.isDebugEnabled()) logger.debug("Snapshot for {}/{} with {} levels", symbolName, exchangeName, eventsNum);
    }

    private void processIncrementalRefresh(Message msg) {
        String symbolName = msg.get(Tag.Symbol);
        String exchangeName = msg.get(Tag.SecurityExchange);
        int eventsNum = msg.getInteger(Tag.NoMDEntries);
        if(logger.isDebugEnabled()) logger.debug("IncrementalRefresh for {}/{} with {} levels", symbolName, exchangeName, eventsNum);
    }

    private void processSecurityList(Message msg) {
        String result = msg.get(Tag.SecurityRequestResult);
        if(FIX44.SecurityRequestResult.ValidReq.equals(result)) {
            Group entries = msg.getGroup(Tag.NoRelatedSym);
            String symbolName = entries.get(Tag.Symbol, 0);
            String exchangeName = entries.get(Tag.SecurityExchange, 0);
            if(securityListener != null) {
                securityListener.onSecurityReceived(new Symbol(symbolName, exchangeName), false);
            }
        } else {
            logger.warn("SecurityRequest failed. Code: {}, Description: {}", result, msg.get(Tag.Text));
        }
    }

    public void setSecurityListener(ISecurityListener securityListener) {
        this.securityListener = securityListener;
    }
}
