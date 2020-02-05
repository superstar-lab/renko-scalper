package io.xtrd.samples.neat_shooter.fix.ord;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.engine.SessionState;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import io.xtrd.samples.neat_shooter.IOrderEventsListener;
import io.xtrd.samples.neat_shooter.IStateEventsEmitter;
import io.xtrd.samples.neat_shooter.State;
import io.xtrd.samples.neat_shooter.fix.MessagesNormalizer;
import io.xtrd.samples.neat_shooter.msgs.OrdersEvent;
import io.xtrd.samples.neat_shooter.msgs.PositionReport;
import io.xtrd.samples.neat_shooter.msgs.RequestForPositionsAck;
import io.xtrd.samples.neat_shooter.msgs.StateChangedEvent;

public class OrdersListener implements Session.InboundApplicationMessageListener, Session.StateChangeListener {
    private IStateEventsEmitter emitter;
    private MessagesNormalizer normalizer;
    private IOrderEventsListener ordersEventListener;

    @Override
    public void onInboundApplicationMessage(Object o, Session.InboundApplicationMessageArgs args) {
        Message msg = args.getMsg();
        if(FIX44.MsgType.ExecutionReport.equals(msg.getType())) {
            OrdersEvent event = normalizer.parseExecutionReport(msg);
            ordersEventListener.onOrdersEvent(event);
        } else if (FIX44.MsgType.RequestForPositionsAck.equals(msg.getType())) {
            RequestForPositionsAck result = normalizer.parseRequestForPositionsAck(msg);
            ordersEventListener.onOrdersEvent(result);
        } else if (FIX44.MsgType.PositionReport.equals(msg.getType())) {
            PositionReport report = normalizer.parsePositionReport(msg);
            ordersEventListener.onOrdersEvent(report);
        }
    }


    @Override
    public void onStateChange(Object session, Session.StateChangeArgs args) {
        if(args.getNewState() == SessionState.ESTABLISHED) {
            emitter.emit(new StateChangedEvent.Builder().previous(State.ORD_CONNECTING).current(State.ORD_CONNECTED).build());
        } else if (args.getNewState() == SessionState.DISCONNECTED) {
            emitter.emit(new StateChangedEvent.Builder().previous(State.ORD_CONNECTING).current(State.ORD_DISCONNECTED).build());
        }
    }

    public void setEmitter(IStateEventsEmitter emitter) {
        this.emitter = emitter;
    }

    public void setOrdersEventListener(IOrderEventsListener ordersEventListener) {
        this.ordersEventListener = ordersEventListener;
    }

    public void setMessagesNormalizer(MessagesNormalizer normalizer) {
        this.normalizer = normalizer;
    }
}
