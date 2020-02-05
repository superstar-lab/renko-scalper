package io.xtrd.samples.neat_shooter.md;

public class MarketDataEvent {
    public enum UpdateType {UNDEFINED, NEW, UPDATE, DELETE, RESET}
    public enum Side {UNDEFINED, BID, ASK, TRADE}

    private final UpdateType updateType;
    private final Side side;
    private final long price;
    private final long size;
    private final long timestamp;

    public MarketDataEvent(UpdateType updateType, Side side, long price, long size, long timestamp) {
        this.updateType = updateType;
        this.side = side;
        this.price = price;
        this.size = size;
        this.timestamp = timestamp;
    }

    public UpdateType getUpdateType() {
        return updateType;
    }

    public Side getSide() {
        return side;
    }

    public long getPrice() {
        return price;
    }

    public long getSize() {
        return size;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
