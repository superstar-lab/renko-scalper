package io.xtrd.samples.neat_shooter.msgs;

import io.xtrd.samples.neat_shooter.IMessage;
import io.xtrd.samples.neat_shooter.State;

public class StateChangedEvent implements IMessage {
    private final State previous;
    private final State current;

    protected StateChangedEvent(Builder builder) {
        this.previous = builder.previous;
        this.current = builder.current;
    }

    public State getPrevious() {
        return previous;
    }

    public State getCurrent() {
        return current;
    }

    @Override
    public String toString() {
        return new StringBuilder("[StateChangedEvent. ").append(previous).append(" => ").append(current).append("]").toString();
    }

    public static class Builder {
        private State previous = State.UNDEFINED;
        private State current;

        public Builder previous(State previous) {
            this.previous = previous;

            return this;
        }

        public Builder current(State current) {
            this.current = current;

            return this;
        }

        public StateChangedEvent build() {
            return new StateChangedEvent(this);
        }
    }
}
