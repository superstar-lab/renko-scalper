package io.xtrd.samples.md_reader.tasks;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.parser.Message;
import io.xtrd.samples.md_reader.ConfigKeys;
import io.xtrd.samples.md_reader.Context;
import io.xtrd.samples.md_reader.Symbol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;


public class Subscribe implements Runnable {
    private final Logger logger = LoggerFactory.getLogger(Subscribe.class);
    private int id;
    private final Symbol symbol;
    private final Session session;
    private final Context context;

    public Subscribe(int id, Symbol symbol, Session session, Context context) {
        this.id = id;
        this.symbol = symbol;
        this.session = session;
        this.context = context;
    }

    @Override
    public void run() {
        Message msg = context.getMessagesFactory().getMarketDataSubscribe(
            id,
            Integer.parseInt(context.getConfig().getProperty(ConfigKeys.BOOK_DEPTH, "5")),
            symbol.getName(),
            symbol.getExchange()
        );
        if(logger.isDebugEnabled()) logger.debug("Sending subscription request for Symbol {}", symbol);
        session.sendNB(msg);
        long delay = Simulator.getDelay(context.getBaseDelay(), context.getMinDelay(), context.getMaxDelay());
        if(logger.isDebugEnabled()) logger.debug("Subscription will be terminated after {} seconds", delay);
        context.getWorkers().schedule(new Unsubscribe(id, symbol, session, context), delay, TimeUnit.SECONDS);
    }
}
