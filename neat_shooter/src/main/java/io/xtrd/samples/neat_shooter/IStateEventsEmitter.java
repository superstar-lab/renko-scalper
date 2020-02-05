package io.xtrd.samples.neat_shooter;

import io.xtrd.samples.neat_shooter.msgs.StateChangedEvent;

public interface IStateEventsEmitter {
    void emit(StateChangedEvent event);
}
