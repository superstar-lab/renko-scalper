package io.xtrd.samples.neat_shooter.msgs;

public class RequestForPositionsAck extends OrdersEvent {
    private final int requestId;
    private final boolean success;
    private final int totalPositions;

    protected RequestForPositionsAck(Builder builder) {
        this.requestId = builder.requestId;
        this.success = builder.success;
        this.totalPositions = builder.totalPositions;
    }

    public int getRequestId() {
        return requestId;
    }

    public boolean isSuccess() {
        return success;
    }

    public int getTotalPositions() {
        return totalPositions;
    }

    @Override
    public String toString() {
        return new StringBuilder("[RequestForPositionsAck. Request ID: ").append(requestId)
            .append(", Success: ").append(success)
            .append(", Positions: ").append(totalPositions)
            .append("]")
            .toString();
    }

    public static class Builder {
        private int requestId;
        private boolean success;
        private int totalPositions;

        public Builder requestId(int requestId) {
            this.requestId = requestId;

            return this;
        }

        public Builder success(boolean success) {
            this.success = success;

            return this;
        }

        public Builder totalPositions(int totalPositions) {
            this.totalPositions = totalPositions;

            return this;
        }

        public RequestForPositionsAck build() {
            return new RequestForPositionsAck(this);
        }
    }

}
