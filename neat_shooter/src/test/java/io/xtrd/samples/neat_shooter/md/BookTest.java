package io.xtrd.samples.neat_shooter.md;

import io.xtrd.samples.neat_shooter.Exchange;
import org.junit.Test;

import static org.junit.Assert.*;

public class BookTest {
    private Exchange HUOBI = new Exchange.Builder().name("HUOBI").build();
    private Symbol symbol = new Symbol.Builder().name("ETH/USDT").pricePower(8).sizePower(6).exchange(HUOBI).build();
    private Book book = new Book(symbol);

    @Test
    public void bidNewEventsTest() {
        MarketDataEvent[] marketDataEvents = new MarketDataEvent[]{
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136012, 125662, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136013, 125663, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136014, 125664, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136015, 125665, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136016, 125666, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136017, 125667, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136018, 125668, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136019, 125669, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136020, 125670, System.currentTimeMillis())
        };

        MarketDataEvent[] updates = book.processEvents(marketDataEvents);
        assertEquals(10, updates.length);

        MarketDataEvent topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertNull(topAsk);

        MarketDataEvent topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertEquals(136020, topBid.getPrice());
        assertEquals(MarketDataEvent.UpdateType.NEW, topBid.getUpdateType());
        assertEquals(125670, topBid.getSize());

        MarketDataEvent[] snapshotAsk = book.getSnapshot(MarketDataEvent.Side.ASK);
        assertEquals(0, snapshotAsk.length);

        MarketDataEvent[] snapshotBid = book.getSnapshot(MarketDataEvent.Side.BID);
        assertEquals(10, snapshotBid.length);


        MarketDataEvent[] incorrectSnapshot = book.getSnapshot(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectSnapshot);

        MarketDataEvent incorrectTop = book.getTopOfTheBook(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectTop);
    }

    @Test
    public void askNewEventsTest() {
        MarketDataEvent[] marketDataEvents = new MarketDataEvent[]{
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136012, 125662, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136013, 125663, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136014, 125664, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136015, 125665, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136016, 125666, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136017, 125667, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136018, 125668, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136019, 125669, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136020, 125670, System.currentTimeMillis())
        };

        MarketDataEvent[] updates = book.processEvents(marketDataEvents);
        assertEquals(10, updates.length);

        MarketDataEvent topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertEquals(136011, topAsk.getPrice());
        assertEquals(MarketDataEvent.UpdateType.NEW, topAsk.getUpdateType());
        assertEquals(125661, topAsk.getSize());


        MarketDataEvent topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertNull(topBid);

        MarketDataEvent[] snapshotAsk = book.getSnapshot(MarketDataEvent.Side.ASK);
        assertEquals(10, snapshotAsk.length);

        MarketDataEvent[] snapshotBid = book.getSnapshot(MarketDataEvent.Side.BID);
        assertEquals(0, snapshotBid.length);


        MarketDataEvent[] incorrectSnapshot = book.getSnapshot(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectSnapshot);

        MarketDataEvent incorrectTop = book.getTopOfTheBook(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectTop);
    }

    @Test
    public void bidUpdateEventsTest() {
        MarketDataEvent[] marketDataEvents = new MarketDataEvent[]{
                new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.BID, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.BID, 136012, 125662, System.currentTimeMillis())
        };
        MarketDataEvent[] updates = book.processEvents(marketDataEvents);
        assertEquals(2, updates.length);

        MarketDataEvent topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertNull(topAsk);

        MarketDataEvent topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertEquals(136012, topBid.getPrice());
        assertEquals(MarketDataEvent.UpdateType.NEW, topBid.getUpdateType());
        assertEquals(125662, topBid.getSize());

        MarketDataEvent[] snapshotAsk = book.getSnapshot(MarketDataEvent.Side.ASK);
        assertEquals(0, snapshotAsk.length);

        MarketDataEvent[] snapshotBid = book.getSnapshot(MarketDataEvent.Side.BID);
        assertEquals(2, snapshotBid.length);


        MarketDataEvent[] incorrectSnapshot = book.getSnapshot(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectSnapshot);

        MarketDataEvent incorrectTop = book.getTopOfTheBook(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectTop);
    }

    @Test
    public void askUpdateEventsTest() {
        MarketDataEvent[] marketDataEvents = new MarketDataEvent[]{
                new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.ASK, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.ASK, 136012, 125662, System.currentTimeMillis())
        };
        MarketDataEvent[] updates = book.processEvents(marketDataEvents);
        assertEquals(2, updates.length);

        MarketDataEvent topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertEquals(136011, topAsk.getPrice());
        assertEquals(MarketDataEvent.UpdateType.NEW, topAsk.getUpdateType());
        assertEquals(125661, topAsk.getSize());


        MarketDataEvent topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertNull(topBid);

        MarketDataEvent[] snapshotAsk = book.getSnapshot(MarketDataEvent.Side.ASK);
        assertEquals(2, snapshotAsk.length);

        MarketDataEvent[] snapshotBid = book.getSnapshot(MarketDataEvent.Side.BID);
        assertEquals(0, snapshotBid.length);


        MarketDataEvent[] incorrectSnapshot = book.getSnapshot(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectSnapshot);

        MarketDataEvent incorrectTop = book.getTopOfTheBook(MarketDataEvent.Side.UNDEFINED);
        assertNull(incorrectTop);
    }

    @Test
    public void deleteEventsEmptyBookTest() {
        MarketDataEvent[] marketDataEvents = new MarketDataEvent[]{
                new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.BID, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.BID, 136012, 125662, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.ASK, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.ASK, 136012, 125662, System.currentTimeMillis())
        };
        MarketDataEvent[] updates = book.processEvents(marketDataEvents);
        assertEquals(0, updates.length);

        MarketDataEvent topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertNull(topAsk);

        MarketDataEvent topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertNull(topBid);

        MarketDataEvent[] snapshotAsk = book.getSnapshot(MarketDataEvent.Side.ASK);
        assertEquals(0, snapshotAsk.length);

        MarketDataEvent[] snapshotBid = book.getSnapshot(MarketDataEvent.Side.BID);
        assertEquals(0, snapshotBid.length);
    }

    @Test
    public void fullTest() {
        MarketDataEvent[] marketDataEvents = new MarketDataEvent[]{
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136001, 125001, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.BID, 136002, 125002, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136011, 125661, System.currentTimeMillis()),
                new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.ASK, 136012, 125662, System.currentTimeMillis())
        };
        MarketDataEvent[] updates = book.processEvents(marketDataEvents);
        assertEquals(4, updates.length);

        MarketDataEvent topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertEquals(136011, topAsk.getPrice());

        MarketDataEvent topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertEquals(136002, topBid.getPrice());
        assertEquals(125002, topBid.getSize());

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.BID, 136002, 100000, System.currentTimeMillis())
                });
        topBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
        assertEquals(100000, topBid.getSize());
        assertEquals(MarketDataEvent.UpdateType.UPDATE, topBid.getUpdateType());

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.ASK, 136011, 100000, System.currentTimeMillis())
                });
        topAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
        assertEquals(100000, topAsk.getSize());
        assertEquals(MarketDataEvent.UpdateType.UPDATE, topAsk.getUpdateType());

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.BID, 136010, 100000, System.currentTimeMillis())
                });

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.UPDATE, MarketDataEvent.Side.ASK, 136110, 100000, System.currentTimeMillis())
                });

        assertEquals(3, book.getSnapshot(MarketDataEvent.Side.BID).length);
        assertEquals(3, book.getSnapshot(MarketDataEvent.Side.ASK).length);

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.BID, 136010, 0, System.currentTimeMillis()),
                        new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.BID, 136002, 0, System.currentTimeMillis())
                });

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.ASK, 136110, 0, System.currentTimeMillis()),
                        new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.ASK, 136012, 0, System.currentTimeMillis())
                });

        MarketDataEvent[] bids = book.getSnapshot(MarketDataEvent.Side.BID);
        assertEquals(1, bids.length);
        assertEquals(136001, bids[0].getPrice());
        assertEquals(125001, bids[0].getSize());
        assertEquals(MarketDataEvent.UpdateType.NEW, bids[0].getUpdateType());

        MarketDataEvent[] asks = book.getSnapshot(MarketDataEvent.Side.ASK);
        assertEquals(1, asks.length);
        assertEquals(136011, asks[0].getPrice());
        assertEquals(100000, asks[0].getSize());
        assertEquals(MarketDataEvent.UpdateType.UPDATE, asks[0].getUpdateType());

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.RESET, MarketDataEvent.Side.ASK, 0, 0, System.currentTimeMillis()),
                        new MarketDataEvent(MarketDataEvent.UpdateType.RESET, MarketDataEvent.Side.BID, 0, 0, System.currentTimeMillis())
                });

        assertEquals(0, book.getSnapshot(MarketDataEvent.Side.BID).length);
        assertEquals(0, book.getSnapshot(MarketDataEvent.Side.ASK).length);

        book.processEvents(
                new MarketDataEvent[]{
                        new MarketDataEvent(MarketDataEvent.UpdateType.NEW, MarketDataEvent.Side.TRADE, 0, 0, System.currentTimeMillis()),
                        new MarketDataEvent(MarketDataEvent.UpdateType.DELETE, MarketDataEvent.Side.TRADE, 0, 0, System.currentTimeMillis())
                });
    }

}
