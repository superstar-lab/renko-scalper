package io.xtrd.samples.neat_shooter.md;

import io.xtrd.samples.neat_shooter.Exchange;

import java.util.HashMap;
import java.util.Map;

public class MarketDataDictionary {
    private final Map<String, Symbol> symbols = new HashMap<>();
    private final Map<String, Exchange> exchanges = new HashMap<>();

    public void init() {
        Exchange HUOBI = new Exchange.Builder().name("HUOBI").build();
        exchanges.put(HUOBI.getName(), HUOBI);

        Symbol symbol = new Symbol.Builder().name("ETH/USDT").pricePower(8).sizePower(6).exchange(HUOBI).build();
        symbols.put(symbol.getName(), symbol);

    }

    public Symbol getSymbol(String name) {
        return symbols.get(name);
    }

    public Exchange getExchange(String name) {
        return exchanges.get(name);
    }
}
