package io.xtrd.samples.neat_shooter.trade;

import io.xtrd.samples.neat_shooter.Exchange;
import io.xtrd.samples.neat_shooter.md.Symbol;
import org.joda.time.DateTime;

public class Order {
    public enum Type {UNDEFINED, MARKET, LIMIT}
    public enum Side {UNDEFINED, BUY, SELL}
    public enum Status {UNDEFINED, PENDING_NEW, NEW, PARTIALLY_FILLED, FILLED, CANCELED, REJECTED}

    private int id;
    private int orderId;
    private String secondaryOrderId;
    private int loginId;
    private Symbol symbol;
    private Exchange exchange;
    private Type type;
    private Side side;
    private DateTime createTime;
    private DateTime lastUpdateTime;
    private long price;
    private long size;
    private Status status;
    private long filledSize;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getLoginId() {
        return loginId;
    }

    public void setLoginId(int loginId) {
        this.loginId = loginId;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Side getSide() {
        return side;
    }

    public void setSide(Side side) {
        this.side = side;
    }

    public DateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(DateTime createTime) {
        this.createTime = createTime;
    }

    public DateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(DateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public long getFilledSize() {
        return filledSize;
    }

    public void setFilledSize(long filledSize) {
        this.filledSize = filledSize;
    }
}
