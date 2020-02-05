package io.xtrd.samples.neat_shooter.msgs;

import io.xtrd.samples.neat_shooter.IMessage;
import io.xtrd.samples.neat_shooter.md.Symbol;

public class BookChangedEvent implements IMessage {
    private final Symbol symbol;

    public BookChangedEvent(Symbol symbol) {
        this.symbol = symbol;
    }

    public Symbol getSymbol() {
        return symbol;
    }
}
