package io.xtrd.samples.neat_shooter.msgs;

public class PositionReport extends OrdersEvent {
    private final String assetName;
    private final double size;
    private final boolean lastReport;

    protected PositionReport(Builder builder) {
        this.assetName = builder.assetName;
        this.size = builder.size;
        this.lastReport = builder.lastReport;
    }

    public String getAssetName() {
        return assetName;
    }

    public double getSize() {
        return size;
    }

    public boolean isLastReport() {
        return lastReport;
    }

    public static class Builder {
        private String assetName;
        private double size;
        private boolean lastReport;

        public Builder assetName(String assetName) {
            this.assetName = assetName;

            return this;
        }

        public Builder size(double size) {
            this.size = size;

            return this;
        }

        public Builder lastReport(boolean lastReport) {
            this.lastReport = lastReport;

            return this;
        }

        public PositionReport build() {
            return new PositionReport(this);
        }
    }
}
