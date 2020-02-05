package io.xtrd.samples.neat_shooter.msgs;

import io.xtrd.samples.neat_shooter.md.MarketDataEvent;
import io.xtrd.samples.neat_shooter.md.Symbol;

public class IncrementalMarketDataUpdate extends BookChangedEvent {
    private final MarketDataEvent events[];

    public IncrementalMarketDataUpdate(Symbol symbol, MarketDataEvent events[]) {
        super(symbol);
        this.events = events;
    }

    public MarketDataEvent[] getEvents() {
        return events;
    }

    @Override
    public String toString() {
        return new StringBuilder("[MD Incremental Update. Symbol: ").append(getSymbol()).append(", Events: ").append(events.length).append("]").toString();
    }
}
