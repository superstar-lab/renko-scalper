package io.xtrd.samples.neat_shooter.md;

import java.util.*;

public class Book {
    private final Symbol symbol;

    protected String error = null;

    private final List<MarketDataEvent> updates = new ArrayList<>();
    private TreeMap<Long, MarketDataEvent> bids = new TreeMap<>(Comparator.reverseOrder());
    private TreeMap<Long, MarketDataEvent> asks = new TreeMap<>();

    public Book(Symbol symbol) {
        this.symbol = symbol;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public String getError() {
        String tmp = error;
        error = null;
        return tmp;
    }

    public MarketDataEvent getTopOfTheBook(MarketDataEvent.Side side) {
        MarketDataEvent result = null;
        if (side.equals(MarketDataEvent.Side.BID)) {
            if (!bids.isEmpty()) {
                result = bids.firstEntry().getValue();
            }
        } else if (side.equals(MarketDataEvent.Side.ASK)) {
            if (!asks.isEmpty()) {
                result = asks.firstEntry().getValue();
            }
        }
        return result;
    }

    public MarketDataEvent[] getSnapshot(MarketDataEvent.Side side) {
        MarketDataEvent[] result = null;
        if (side.equals(MarketDataEvent.Side.BID)) {
            result = new MarketDataEvent[bids.size()];
            bids.values().toArray(result);
        } else if (side.equals(MarketDataEvent.Side.ASK)) {
            result = new MarketDataEvent[asks.size()];
            asks.values().toArray(result);
        }
        return result;
    }

    public void reset() {
        bids.clear();
        asks.clear();
        updates.clear();
    }

    public MarketDataEvent[] processEvents(MarketDataEvent[] events) {
        updates.clear();

        for (MarketDataEvent event : events) {
            switch (event.getUpdateType()) {
                case NEW:
                    if (event.getSide() == MarketDataEvent.Side.BID) {
                        processNewEvent(event, bids);
                    } else if (event.getSide() == MarketDataEvent.Side.ASK) {
                        processNewEvent(event, asks);
                    } else {
                        error = "[NEW] Unsupported event side: '" + event.getSide() + "'";
                        return null;
                    }
                    break;
                case UPDATE:
                    if (event.getSide() == MarketDataEvent.Side.BID) {
                        processUpdateEvent(event, bids);
                    } else if (event.getSide() == MarketDataEvent.Side.ASK) {
                        processUpdateEvent(event, asks);
                    } else {
                        error = "[UPDATE] Unsupported event side: '" + event.getSide() + "'";
                        return null;
                    }
                    break;
                case DELETE:
                    if (event.getSide() == MarketDataEvent.Side.BID) {
                        processDeleteEvent(event, bids);
                    } else if (event.getSide() == MarketDataEvent.Side.ASK) {
                        processDeleteEvent(event, asks);
                    } else {
                        error = "[DELETE] Unsupported event side: '" + event.getSide() + "'";
                        return null;
                    }
                    break;
                case RESET:
                    processResetEvent(event);
                    break;
                default:
                    error = "Unsupported event type: '" + event.getUpdateType() + "'";
                    return null;
            }
        }

        MarketDataEvent[] result = new MarketDataEvent[updates.size()];
        updates.toArray(result);
        return result;
    }

    private void processNewEvent(MarketDataEvent event, TreeMap<Long, MarketDataEvent> events) {
        if (!event.getSide().equals(MarketDataEvent.Side.TRADE)) {
            if (events.remove(event.getPrice()) != null) {
                updateEvent(event, events);
            } else {
                newEvent(event, events);
            }
        }
    }

    private void processUpdateEvent(MarketDataEvent event, TreeMap<Long, MarketDataEvent> events) {
        if (events.containsKey(event.getPrice())) {
            updateEvent(event, events);
        } else {
            newEvent(event, events);
        }
    }

    private void processDeleteEvent(MarketDataEvent event, TreeMap<Long, MarketDataEvent> events) {
        deleteEvent(event, events);
    }

    private void processResetEvent(MarketDataEvent event) {
        if (event.getSide().equals(MarketDataEvent.Side.BID)) {
            for (MarketDataEvent bid : bids.values()) {
                deleteEvent(bid, bids);
            }
        } else if (event.getSide().equals(MarketDataEvent.Side.ASK)) {
            for (MarketDataEvent ask : asks.values()) {
                deleteEvent(ask, asks);
            }
        } else if (event.getSide().equals(MarketDataEvent.Side.UNDEFINED)) {
            for (MarketDataEvent bid : bids.values()) {
                deleteEvent(bid, bids);
            }
            for (MarketDataEvent ask : asks.values()) {
                deleteEvent(ask, asks);
            }
        }
    }

    private MarketDataEvent copyEvent(MarketDataEvent event, MarketDataEvent.UpdateType updateType) {
        MarketDataEvent result = new MarketDataEvent(updateType, event.getSide(), event.getPrice(), event.getSize(), event.getTimestamp());
        return result;
    }

    private void newEvent(MarketDataEvent event, TreeMap<Long, MarketDataEvent> events) {
        events.put(event.getPrice(), copyEvent(event, MarketDataEvent.UpdateType.NEW));
        updates.add(copyEvent(event, MarketDataEvent.UpdateType.NEW));
    }

    private void updateEvent(MarketDataEvent event, TreeMap<Long, MarketDataEvent> events) {
        events.remove(event.getPrice());
        events.put(event.getPrice(), copyEvent(event, MarketDataEvent.UpdateType.UPDATE));
        updates.add(copyEvent(event, MarketDataEvent.UpdateType.UPDATE));
    }

    private void deleteEvent(MarketDataEvent event, TreeMap<Long, MarketDataEvent> events) {
        if (events.remove(event.getPrice()) != null) {
            updates.add(copyEvent(event, MarketDataEvent.UpdateType.DELETE));
        }
    }
}
