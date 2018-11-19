package io.xtrd.samples.md_reader.tasks;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.parser.Message;
import io.xtrd.samples.md_reader.Context;
import io.xtrd.samples.md_reader.Symbol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

public class Unsubscribe implements Runnable {
    private final Logger logger = LoggerFactory.getLogger(Subscribe.class);
    private int id;
    private final Symbol symbol;
    private final Session session;
    private final Context context;

    public Unsubscribe(int id, Symbol symbol, Session session, Context context) {
        this.id = id;
        this.symbol = symbol;
        this.session = session;
        this.context = context;
    }

    @Override
    public void run() {
        Message msg = context.getMessagesFactory().getMarketDataUnsubscribe(
            id,
            symbol.getName(),
            symbol.getExchange()
        );
        session.sendNB(msg);
        if(logger.isDebugEnabled()) logger.debug("Sending un-subscription request for Symbol {}", symbol);
        long delay = Simulator.getDelay(context.getBaseDelay(), context.getMinDelay(), context.getMaxDelay());
        if(logger.isDebugEnabled()) logger.debug("Subscription for Symbol {} will be renewed after {} seconds", symbol, delay);
        context.getWorkers().schedule(new Subscribe(context.getNextId(), symbol, session, context), delay, TimeUnit.SECONDS);
    }
}
