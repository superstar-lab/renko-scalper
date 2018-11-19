package io.xtrd.samples.md_reader;

import io.xtrd.samples.md_reader.link.MessagesFactory;

import java.util.Properties;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

public class Context {
    private final Properties config;
    private final ScheduledExecutorService workers;
    private final MessagesFactory messagesFactory;
    private final AtomicInteger idGenerator = new AtomicInteger(0);
    private int baseDelay;
    private int minDelay;
    private int maxDelay;

    public Context(Properties config, ScheduledExecutorService workers, MessagesFactory messagesFactory) {
        this.config = config;
        this.workers = workers;
        this.messagesFactory = messagesFactory;
        baseDelay = Integer.parseInt(config.getProperty(ConfigKeys.BASE_DELAY));
        minDelay = Integer.parseInt(config.getProperty(ConfigKeys.MIN_DELAY));
        maxDelay = Integer.parseInt(config.getProperty(ConfigKeys.MAX_DELAY));
    }

    public Properties getConfig() {
        return config;
    }

    public ScheduledExecutorService getWorkers() {
        return workers;
    }

    public MessagesFactory getMessagesFactory() {
        return messagesFactory;
    }

    public int getNextId() {
        return idGenerator.incrementAndGet();
    }

    public int getBaseDelay() {
        return baseDelay;
    }

    public int getMinDelay() {
        return minDelay;
    }

    public int getMaxDelay() {
        return maxDelay;
    }
}
