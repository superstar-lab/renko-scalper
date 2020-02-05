package io.xtrd.samples.neat_shooter.fix.md;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.engine.SessionState;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import io.xtrd.samples.neat_shooter.IBookChangesListener;
import io.xtrd.samples.neat_shooter.IStateEventsEmitter;
import io.xtrd.samples.neat_shooter.State;
import io.xtrd.samples.neat_shooter.fix.MessagesNormalizer;
import io.xtrd.samples.neat_shooter.msgs.IncrementalMarketDataUpdate;
import io.xtrd.samples.neat_shooter.msgs.MarketDataSnapshot;
import io.xtrd.samples.neat_shooter.msgs.StateChangedEvent;

public class MarketDataListener implements Session.InboundApplicationMessageListener, Session.StateChangeListener {
    private IStateEventsEmitter emitter;
    private IBookChangesListener marketDataListener;
    private MessagesNormalizer normalizer;

    @Override
    public void onInboundApplicationMessage(Object session, Session.InboundApplicationMessageArgs args) {
        Message msg = args.getMsg();
        if(FIX44.MsgType.MarketDataIncrementalRefresh.equals(msg.getType())) {
            IncrementalMarketDataUpdate update = normalizer.parseIncrementalMarketDataUpdate(msg);
            marketDataListener.onBookChangedEvent(update);
        } else if (FIX44.MsgType.MarketDataSnapshotFullRefresh.equals(msg.getType())) {
            MarketDataSnapshot snapshot = normalizer.parseMarketDataSnapshot(msg);
            marketDataListener.onBookChangedEvent(snapshot);
        }
    }

    @Override
    public void onStateChange(Object session, Session.StateChangeArgs args) {
        if(args.getNewState() == SessionState.ESTABLISHED) {
            emitter.emit(new StateChangedEvent.Builder().previous(State.MD_CONNECTED).current(State.MD_CONNECTED).build());
        } else if (args.getNewState() == SessionState.DISCONNECTED) {
            emitter.emit(new StateChangedEvent.Builder().previous(State.MD_CONNECTED).current(State.MD_DISCONNECTED).build());
        }
    }

    public void setEmitter(IStateEventsEmitter emitter) {
        this.emitter = emitter;
    }

    public void setMarketDataListener(IBookChangesListener marketDataListener) {
        this.marketDataListener = marketDataListener;
    }

    public void setMessagesNormalizer(MessagesNormalizer normalizer) {
        this.normalizer = normalizer;
    }
}
