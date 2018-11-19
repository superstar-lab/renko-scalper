package io.xtrd.samples.md_reader;

public class Symbol {
    private final String name;
    private final String exchange;

    public Symbol(String name, String exchange) {
        this.name = name;
        this.exchange = exchange;
    }

    public String getName() {
        return name;
    }

    public String getExchange() {
        return exchange;
    }

    public String toString() {
        return new StringBuilder("[Symbol ")
            .append(name)
            .append(", Exchange: ").append(exchange)
            .append("]").toString();
    }
}
