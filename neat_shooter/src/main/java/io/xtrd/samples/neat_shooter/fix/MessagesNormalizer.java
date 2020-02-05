package io.xtrd.samples.neat_shooter.fix;

import biz.onixs.fix.parser.Group;
import biz.onixs.fix.parser.Message;
import biz.onixs.fix.tag.FIX44;
import biz.onixs.fix.tag.Tag;
import io.xtrd.samples.neat_shooter.Exchange;
import io.xtrd.samples.neat_shooter.md.MarketDataDictionary;
import io.xtrd.samples.neat_shooter.md.MarketDataEvent;
import io.xtrd.samples.neat_shooter.md.Symbol;
import io.xtrd.samples.neat_shooter.msgs.*;
import io.xtrd.samples.neat_shooter.trade.ExecutionReport;
import io.xtrd.samples.neat_shooter.trade.Order;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class MessagesNormalizer {
    private MarketDataDictionary marketDataDictionary = null;
    private final DateTimeFormatter fmt = DateTimeFormat.forPattern("YYYYMMdd-HH:mm:ss.SSS");

    private MarketDataEvent.Side getMdEventSide(String value) {
        switch (value) {
            case FIX44.MDEntryType.Bid:
                return MarketDataEvent.Side.BID;
            case FIX44.MDEntryType.Offer:
                return MarketDataEvent.Side.ASK;
            default:
                return MarketDataEvent.Side.UNDEFINED;
        }
    }

    public MarketDataSnapshot parseMarketDataSnapshot(Message msg) {
        Symbol symbol = marketDataDictionary.getSymbol(msg.get(Tag.Symbol));
        int size = msg.getInteger(Tag.NoMDEntries);

        MarketDataEvent events[] = new MarketDataEvent[size];

        Group entries = msg.getGroup(Tag.NoMDEntries);

        DateTime timestamp;
        for(int i = 0;i < size;i++) {
            timestamp = fmt.parseDateTime(entries.get(Tag.MDEntryDate, i) + "-" + entries.get(Tag.MDEntryTime, i)).withZone(DateTimeZone.UTC);

            events[i] = new MarketDataEvent(
                MarketDataEvent.UpdateType.NEW,
                getMdEventSide(entries.get(Tag.MDEntryType, i)),
                Symbol.castToLong(entries.getDouble(Tag.MDEntryPx, i), symbol.getPriceFactor()),
                Symbol.castToLong(entries.getDouble(Tag.MDEntrySize, i), symbol.getSizeFactor()),
                timestamp.getMillis()
            );
        }

        return new MarketDataSnapshot(symbol, events);
    }

    public IncrementalMarketDataUpdate parseIncrementalMarketDataUpdate(Message msg) {
        Symbol symbol = marketDataDictionary.getSymbol(msg.get(Tag.Symbol));
        int size = msg.getInteger(Tag.NoMDEntries);

        MarketDataEvent events[] = new MarketDataEvent[size];
        Group entries = msg.getGroup(Tag.NoMDEntries);

        DateTime timestamp;
        MarketDataEvent.UpdateType type = MarketDataEvent.UpdateType.UNDEFINED;
        long priceLevelSize = 0;
        for(int i = 0;i < size;i++) {
            timestamp = fmt.parseDateTime(entries.get(Tag.MDEntryDate, i) + "-" + entries.get(Tag.MDEntryTime, i)).withZone(DateTimeZone.UTC);

            switch (entries.get(Tag.MDUpdateAction, i)) {
                case FIX44.MDUpdateAction.New:
                    type = MarketDataEvent.UpdateType.NEW;
                    break;
                case FIX44.MDUpdateAction.Change:
                    type = MarketDataEvent.UpdateType.UPDATE;
                    break;
                case FIX44.MDUpdateAction.Delete:
                    type = MarketDataEvent.UpdateType.DELETE;
                    break;
            }

            if(type != MarketDataEvent.UpdateType.DELETE) {
                //XTRD will not stream size for DELETE actions
                priceLevelSize = Symbol.castToLong(entries.getDouble(Tag.MDEntrySize, i), symbol.getSizeFactor());
            } else {
                priceLevelSize = 0;
            }

            events[i] = new MarketDataEvent(
                type,
                getMdEventSide(entries.get(Tag.MDEntryType, i)),
                Symbol.castToLong(entries.getDouble(Tag.MDEntryPx, i), symbol.getPriceFactor()),
                priceLevelSize,
                timestamp.getMillis()
            );
        }

        return new IncrementalMarketDataUpdate(symbol, events);
    }

    public RequestForPositionsAck parseRequestForPositionsAck(Message msg) {
        RequestForPositionsAck.Builder builder = new RequestForPositionsAck.Builder()
            .requestId(msg.getInteger(Tag.PosReqID))
            .totalPositions(msg.getInteger(Tag.TotalNumPosReports));

        String status = msg.get(Tag.PosReqStatus);
        switch (status) {
            case FIX44.PosReqStatus.Completed:
                builder.success(true);
                break;
            case FIX44.PosReqStatus.Rejected:
                builder.success(false);
                break;
        }

        return builder.build();
    }

    public OrdersEvent parseExecutionReport(Message msg) {
        String execType = msg.get(Tag.ExecType);
        if(FIX44.ExecType.OrderStatus.equals(execType)) {
            return parseOrderStatusResponse(msg);
        } else {
            return parseTradingExecutionReport(msg);
        }
    }

    private OrdersEvent parseOrderStatusResponse(Message msg) {
        if(msg.hasFlag(Tag.LastRptRequested)) {
            return new OrderMassStatusRequestAck.Builder()
                .requestId(msg.getInteger(Tag.MassStatusReqID))
                .success(true)
                .totalOrders(msg.getInteger(Tag.TotNumReports))
                .build();
        } else {
            return null;
        }
    }

    private OrdersEvent parseTradingExecutionReport(Message msg) {
        ExecutionReport result = new ExecutionReport();
        result.setId(msg.getInteger(Tag.ClOrdID));
        result.setReceiveTime(io.xtrd.samples.neat_shooter.common.Utils.getTimestamp());
        Symbol symbol = marketDataDictionary.getSymbol(msg.get(Tag.Symbol));
        result.setSymbol(symbol);
        Exchange exchange = marketDataDictionary.getExchange(msg.get(Tag.ExDestination));
        result.setExchange(exchange);

        String status = msg.get(Tag.OrdStatus);
        switch (status) {
            case FIX44.OrdStatus.PendingNew:
                result.setOrderId(msg.getInteger(Tag.OrderID));
                result.setStatus(Order.Status.PENDING_NEW);
                break;
            case FIX44.OrdStatus.New:
                result.setStatus(Order.Status.NEW);
                result.setOrderId(msg.getInteger(Tag.OrderID));
                result.setSecondaryOrderId(msg.get(Tag.SecondaryOrderID));
                break;
            case FIX44.OrdStatus.Partial:
                result.setOrderId(msg.getInteger(Tag.OrderID));
                result.setSecondaryOrderId(msg.get(Tag.SecondaryOrderID));
                result.setStatus(Order.Status.PARTIALLY_FILLED);
                result.setLastPrice(Symbol.castToLong(msg.getDouble(Tag.LastPx), symbol.getPriceFactor()));
                result.setLastSize(Symbol.castToLong(msg.getDouble(Tag.LastQty), symbol.getSizeFactor()));
                break;
            case FIX44.OrdStatus.Filled:
                result.setOrderId(msg.getInteger(Tag.OrderID));
                result.setSecondaryOrderId(msg.get(Tag.SecondaryOrderID));
                result.setStatus(Order.Status.FILLED);
                result.setLastPrice(Symbol.castToLong(msg.getDouble(Tag.LastPx), symbol.getPriceFactor()));
                result.setLastSize(Symbol.castToLong(msg.getDouble(Tag.LastQty), symbol.getSizeFactor()));
                break;
            case FIX44.OrdStatus.Canceled:
                result.setStatus(Order.Status.CANCELED);
                if(msg.contains(Tag.OrigClOrdID)) {
                    //This is confirmed cancel order
                    result.setOriginalId(msg.getInteger(Tag.OrigClOrdID));
                    result.setOrderId(msg.getInteger(Tag.OrderID));
                    result.setSecondaryOrderId(msg.get(Tag.SecondaryOrderID));
                }
                break;
            case FIX44.OrdStatus.Rejected:
                result.setOrderId(-1);
                result.setStatus(Order.Status.REJECTED);
                result.setText(msg.get(Tag.Text));
                break;
        }

        return result;
    }

    public PositionReport parsePositionReport(Message msg) {
        PositionReport.Builder builder = new PositionReport.Builder()
                .assetName(msg.get(Tag.Symbol));
        Group posSizes = msg.getGroup(Tag.NoPositions);
        builder.size(posSizes.getDouble(Tag.LongQty, 0));

        return builder.build();
    }

    public void setMarketDataDictionary(MarketDataDictionary marketDataDictionary) {
        this.marketDataDictionary = marketDataDictionary;
    }

    public void init() {
        if(marketDataDictionary == null) throw new RuntimeException("MarketDataDictionary is not provided");
    }
}
