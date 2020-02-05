package io.xtrd.samples.neat_shooter;

public class Exchange {
    private final String name;

    protected Exchange(Builder builder) {
        this.name = builder.name;
    }

    public String getName() {
        return name;
    }

    public String toString() {
        return new StringBuilder("[Exchange. Name: ").append(name).append("]").toString();
    }

    public static class Builder {
        String name;

        public Builder name(String name) {
            this.name = name;

            return this;
        }

        public Exchange build() {
            return new Exchange(this);
        }
    }
}
