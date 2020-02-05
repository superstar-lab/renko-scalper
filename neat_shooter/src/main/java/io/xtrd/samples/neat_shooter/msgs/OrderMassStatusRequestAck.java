package io.xtrd.samples.neat_shooter.msgs;

public class OrderMassStatusRequestAck extends OrdersEvent {
    private final int requestId;
    private final boolean success;
    private final int totalOrders;

    protected OrderMassStatusRequestAck(Builder builder) {
        this.requestId = builder.requestId;
        this.success = builder.success;
        this.totalOrders = builder.totalOrders;
    }

    public int getRequestId() {
        return requestId;
    }

    public boolean isSuccess() {
        return success;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    @Override
    public String toString() {
        return new StringBuilder("[OrderMassStatusRequestAck. Request ID: ").append(requestId)
            .append(", Status: ").append(success)
            .append(", Total Orders: ").append(totalOrders)
            .append("]")
            .toString();
    }

    public static class Builder {
        private int requestId;
        private boolean success;
        private int totalOrders;

        public Builder requestId(int requestId) {
            this.requestId = requestId;

            return this;
        }

        public Builder success(boolean success) {
            this.success = success;

            return this;
        }

        public Builder totalOrders(int totalOrders) {
            this.totalOrders = totalOrders;

            return this;
        }

        public OrderMassStatusRequestAck build() {
            return new OrderMassStatusRequestAck(this);
        }
    }
}
