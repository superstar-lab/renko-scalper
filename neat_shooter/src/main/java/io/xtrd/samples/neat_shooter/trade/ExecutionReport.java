package io.xtrd.samples.neat_shooter.trade;

import io.xtrd.samples.neat_shooter.Exchange;
import io.xtrd.samples.neat_shooter.md.Symbol;
import io.xtrd.samples.neat_shooter.msgs.OrdersEvent;
import org.joda.time.DateTime;

public class ExecutionReport extends OrdersEvent {
    private int id;
    private int orderId;
    private int originalId;
    private String secondaryOrderId;
    private Symbol symbol;
    private Exchange exchange;
    private Order.Status status;
    private long lastPrice;
    private long lastSize;
    private DateTime receiveTime;
    private String text;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOriginalId() {
        return originalId;
    }

    public void setOriginalId(int originalId) {
        this.originalId = originalId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getSecondaryOrderId() {
        return secondaryOrderId;
    }

    public void setSecondaryOrderId(String secondaryOrderId) {
        this.secondaryOrderId = secondaryOrderId;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

    public Exchange getExchange() {
        return exchange;
    }

    public void setExchange(Exchange exchange) {
        this.exchange = exchange;
    }

    public Order.Status getStatus() {
        return status;
    }

    public void setStatus(Order.Status status) {
        this.status = status;
    }

    public long getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(long lastPrice) {
        this.lastPrice = lastPrice;
    }

    public long getLastSize() {
        return lastSize;
    }

    public void setLastSize(long lastSize) {
        this.lastSize = lastSize;
    }

    public DateTime getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(DateTime receiveTime) {
        this.receiveTime = receiveTime;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return new StringBuilder("[ExecutionReport. Order ID: ")
        .append(id).append("/").append(orderId)
        .append(", Status: ").append(status)
        .append("]")
        .toString();
    }
}
