package io.xtrd.samples.neat_shooter;

import io.xtrd.samples.neat_shooter.msgs.BookChangedEvent;

@FunctionalInterface
public interface IBookChangesListener {
    void onBookChangedEvent(BookChangedEvent event);
}
