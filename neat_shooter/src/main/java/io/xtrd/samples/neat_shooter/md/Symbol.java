package io.xtrd.samples.neat_shooter.md;

import io.xtrd.samples.neat_shooter.Exchange;

public class Symbol {
    private final String name;
    private final int pricePower;
    private final int sizePower;
    private final long priceFactor;
    private final long sizeFactor;
    private final Exchange exchange;

    protected Symbol(Builder builder) {
        this.name = builder.name;
        this.exchange = builder.exchange;
        this.pricePower = builder.pricePower;
        this.priceFactor = (long) Math.pow(10, this.pricePower);
        this.sizePower = builder.sizePower;
        this.sizeFactor = (long) Math.pow(10, this.sizePower);
    }

    public String getName() {
        return name;
    }

    public int getPricePower() {
        return pricePower;
    }

    public int getSizePower() {
        return sizePower;
    }

    public long getPriceFactor() {
        return priceFactor;
    }

    public long getSizeFactor() {
        return sizeFactor;
    }

    public Exchange getExchange() {
        return exchange;
    }

    public static long castToLong(double value, long factor) {
        return (long) Math.floor(value * factor + 0.5);
    }

    public static double castToDouble(long value, long factor) {
        return value / (double) factor;
    }


    @Override
    public String toString() {
        return new StringBuilder("[Symbol. Name: ").append(name).append(", Exchange: ").append(exchange).append("]").toString();
    }

    public static class Builder {
        private String name;
        private int pricePower;
        private int sizePower;
        private Exchange exchange;

        public Builder name(String name) {
            this.name = name;

            return this;
        }

        public Builder exchange(Exchange exchange) {
            this.exchange = exchange;

            return this;
        }

        public Builder pricePower(int pricePower) {
            this.pricePower = pricePower;

            return this;
        }

        public Builder sizePower(int sizePower) {
            this.sizePower = sizePower;

            return this;
        }

        public Symbol build() {
            return new Symbol(this);
        }
    }
}
