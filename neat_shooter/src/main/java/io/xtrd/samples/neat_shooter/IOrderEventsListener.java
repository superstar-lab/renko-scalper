package io.xtrd.samples.neat_shooter;

import io.xtrd.samples.neat_shooter.msgs.OrdersEvent;

@FunctionalInterface
public interface IOrderEventsListener {
    void onOrdersEvent(OrdersEvent event);
}
