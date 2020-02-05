package io.xtrd.samples.neat_shooter.fix;

import biz.onixs.fix.dictionary.Version;
import biz.onixs.fix.parser.Group;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import biz.onixs.fix.tag.Tag;
import io.xtrd.samples.neat_shooter.md.Symbol;
import io.xtrd.samples.neat_shooter.trade.Order;
import io.xtrd.samples.neat_shooter.common.Utils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;


public class MessagesFactory {
    private final DateTimeFormatter fmt = DateTimeFormat.forPattern("YYYYMMdd-HH:mm:ss.SSS");
    private Version customDialect;
    private long requestId = 1;

    public Message getLogon(String username, String password) {
        Message result = Message.create(FIX44.MsgType.Logon, customDialect);
        result.set(Tag.Username, username);
        result.set(Tag.Password, password);
        result.set(Tag.HeartBtInt, 30/*Default value*/);
        result.setFlag(Tag.ResetSeqNumFlag, true);

        return result;
    }

    public Message getMarketDataRequest(String symbolName, String exchangeName) {
        Message result = Message.create(FIX44.MsgType.MarketDataRequest, customDialect);
        result.set(Tag.MDReqID, requestId++);
        result.set(Tag.SubscriptionRequestType, FIX44.SubscriptionRequestType.SnapshotUpdate);
        result.set(Tag.MarketDepth, 0/*Full Book*/);
        result.set(Tag.MDUpdateType, FIX44.MDUpdateType.Incremental);
        //Set the symbol name and target exchange
        Group symbolsGroup = result.setGroup(Tag.NoRelatedSym, 1);
        symbolsGroup.set(Tag.Symbol, 0, symbolName);
        symbolsGroup.set(Tag.SecurityExchange, 0, exchangeName);
        //Define, what data we would like to see - BIDs, ASKS, and/or TRADEs
        Group entries = result.setGroup(Tag.NoMDEntryTypes, 2);
        entries.set(Tag.MDEntryType, 0, FIX44.MDEntryType.Bid);
        entries.set(Tag.MDEntryType, 1, FIX44.MDEntryType.Offer);

        return result;
    }

    public Message getRequestForPositions(int loginId, String exchangeName) {
        DateTime now = Utils.getTimestamp();

        Message result = Message.create(FIX44.MsgType.RequestForPositions, customDialect);
        result.set(Tag.Account, loginId);
        result.set(Tag.AccountType, FIX44.AccountType.AccountCustomer);
        result.set(Tag.PosReqID, requestId++);
        result.set(Tag.PosReqType, FIX44.PosReqType.Positions);
        result.set(Tag.SubscriptionRequestType, FIX44.SubscriptionRequestType.Snapshot);

        result.set(Tag.ClearingBusinessDate, now.toString());
        result.set(Tag.TransactTime, now.toString());
        Group exchanges = result.setGroup(Tag.NoPartyIDs, 1);
        exchanges.set(Tag.PartyID, 0, exchangeName);
        exchanges.set(Tag.PartyIDSource, 0, FIX44.PartyIDSource.PropCode);
        exchanges.set(Tag.PartyRole, 0, FIX44.PartyRole.Exchange);

        return result;
    }

    public Message getOrderMassStatusRequest(int loginId) {
        Message result = Message.create(FIX44.MsgType.OrderMassStatusRequest, customDialect);
        result.set(Tag.MassStatusReqID, requestId++);
        result.set(Tag.MassStatusReqType, FIX44.MassStatusReqType.StatusAllOrders);
        result.set(Tag.Account, loginId);

        return result;
    }

    public Message getNewOrderSingle(Order order) {
        Message result = Message.create(FIX44.MsgType.NewOrderSingle, customDialect);
        result.set(Tag.HandlInst, FIX44.HandlInst.AutoExecPriv);
        result.set(Tag.Account, order.getLoginId());
        result.set(Tag.ClOrdID, order.getId());
        result.set(Tag.OrderQty, Symbol.castToDouble(order.getSize(), order.getSymbol().getSizeFactor()));
        switch (order.getType()) {
            case MARKET:
                result.set(Tag.OrdType, FIX44.OrdType.Market);
                break;
            case LIMIT:
                result.set(Tag.OrdType, FIX44.OrdType.Limit);
                result.set(Tag.Price, Symbol.castToDouble(order.getPrice(), order.getSymbol().getPriceFactor()));
                break;
        }
        populateSide(order.getSide(), result);
        result.set(Tag.Symbol, order.getSymbol().getName());
        result.set(Tag.ExDestination, order.getExchange().getName());
        result.set(Tag.TimeInForce, FIX44.TimeInForce.Day);
        result.set(Tag.TransactTime, fmt.print(order.getCreateTime()));

        return result;
    }

    public Message getOrderCancelRequest(int id, Order order) {
        Message result = Message.create(FIX44.MsgType.OrderCancelRequest, customDialect);
        result.set(Tag.Account, order.getLoginId());
        result.set(Tag.ClOrdID, id);
        result.set(Tag.OrderID, order.getOrderId());
        result.set(Tag.OrigClOrdID, order.getId());
        populateSide(order.getSide(), result);
        result.set(Tag.Symbol, order.getSymbol().getName());
        result.set(Tag.TransactTime, fmt.print(io.xtrd.samples.neat_shooter.common.Utils.getTimestamp()));

        return result;
    }

    private void populateSide(Order.Side side, Message msg) {
        switch (side) {
            case BUY:
                msg.set(Tag.Side, FIX44.Side.Buy);
                break;
            case SELL:
                msg.set(Tag.Side, FIX44.Side.Sell);
                break;
        }
    }

    public void setDialect(Version customDialect) {
        this.customDialect = customDialect;
    }
}
