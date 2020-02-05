package io.xtrd.samples.neat_shooter;

import biz.onixs.fix.engine.Session;
import biz.onixs.fix.parser.Message;
import io.xtrd.samples.neat_shooter.fix.Credentials;
import io.xtrd.samples.neat_shooter.fix.MessagesFactory;
import io.xtrd.samples.neat_shooter.fix.Utils;
import io.xtrd.samples.neat_shooter.md.Book;
import io.xtrd.samples.neat_shooter.md.MarketDataDictionary;
import io.xtrd.samples.neat_shooter.md.MarketDataEvent;
import io.xtrd.samples.neat_shooter.md.Symbol;
import io.xtrd.samples.neat_shooter.msgs.*;
import io.xtrd.samples.neat_shooter.trade.ExecutionReport;
import io.xtrd.samples.neat_shooter.trade.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Brain implements IStateEventsEmitter, IBookChangesListener, IOrderEventsListener {
    private final Logger logger = LoggerFactory.getLogger(Brain.class);
    private final LinkedBlockingQueue<IMessage> queue = new LinkedBlockingQueue<>();
    private Properties config = null;
    private Session marketDataSession = null;
    private Session tradingSession = null;
    private Credentials tradingSessionCredentials;
    private MessagesFactory messagesFactory = null;
    private MarketDataDictionary marketDataDictionary = null;
    private ScheduledExecutorService executorsService = null;
    private Thread worker = null;
    private String symbolName = null;
    private String exchangeName = null;
    private double orderSize;
    private int enterMarketDelay;
    private int exitMarketDelay;
    private State marketDataSessionState = State.UNDEFINED;
    private State tradingSessionState = State.UNDEFINED;
    private Order order = null;
    private Book book = null;
    private int idGenerator = 1;
    private int totalPositions;
    private int positionsReceived;

    private long getPrice(Order.Side side) {
        long result = 0;
        if (side == Order.Side.BUY) {
            MarketDataEvent bestAsk = book.getTopOfTheBook(MarketDataEvent.Side.ASK);
            if (bestAsk != null) {
                result = bestAsk.getPrice() - bestAsk.getPrice() / 100;
            }
        } else {
            MarketDataEvent bestBid = book.getTopOfTheBook(MarketDataEvent.Side.BID);
            if (bestBid != null) {
                result = bestBid.getPrice() + bestBid.getPrice() / 100;
            }
        }

        return result;
    }


    public void setMarketDataSession(Session marketDataSession) {
        this.marketDataSession = marketDataSession;
    }

    public void setTradingSession(Session tradingSession) {
        this.tradingSession = tradingSession;
    }

    public void setMessagesFactory(MessagesFactory messagesFactory) {
        this.messagesFactory = messagesFactory;
    }

    public void setConfig(Properties config) {
        this.config = config;
    }

    public void setMarketDataDictionary(MarketDataDictionary marketDataDictionary) {
        this.marketDataDictionary = marketDataDictionary;
    }

    public void start() {
        logger.info("Starting Brain");
        if (worker == null) {
            worker = new Thread(new Worker());
            worker.start();
        } else {
            logger.warn("Worker thread is already running");
        }
    }

    public void stop() {
        if (worker != null) {
            worker.interrupt();
            try {
                worker.join(5000);
                logger.info("Worker thread has been successfully stopped");
                worker = null;
            } catch (Exception e) {
                logger.warn("Error during terminating working thread: {}", e.getMessage(), e);
            }
        } else {
            logger.warn("Worker thread is not running");
        }
    }

    public void init() {
        if (config == null) throw new RuntimeException("Configuration file is not provided");
        if (marketDataSession == null) throw new RuntimeException("Market Data session is not provided");
        if (tradingSession == null) throw new RuntimeException("Trading Session is not provided");
        if (messagesFactory == null) throw new RuntimeException("Messages Factory is not provided");
        if (marketDataDictionary == null) throw new RuntimeException("MarketDataDictionary is not provided");
        symbolName = config.getProperty(Constants.SYMBOL_NAME, "");
        if (symbolName.length() == 0)
            throw new RuntimeException("Symbol name is not provided in '" + Constants.SYMBOL_NAME + "'");
        exchangeName = config.getProperty(Constants.EXCHANGE_NAME, "");
        if (exchangeName.length() == 0)
            throw new RuntimeException("Exchange name is not provided in '" + Constants.EXCHANGE_NAME + "'");
        orderSize = Double.parseDouble(config.getProperty(Constants.ORDER_SIZE, "-1"));
        if (orderSize == -1) throw new RuntimeException("Order size is not provided in '" + Constants.ORDER_SIZE + "'");
        enterMarketDelay = Integer.parseInt(config.getProperty(Constants.DELAY_ENTER_MARKET, "-1"));
        if (enterMarketDelay == -1)
            throw new RuntimeException("Enter market delay variable is not provided: '" + Constants.DELAY_ENTER_MARKET + "'");
        exitMarketDelay = Integer.parseInt(config.getProperty(Constants.DELAY_EXIT_MARKET, "-1"));
        if (exitMarketDelay == -1)
            throw new RuntimeException("Exit market delay variable is not provided: '" + Constants.DELAY_EXIT_MARKET + "'");
        logger.info("Application will be trading on Exchange '{}' on Symbol '{}' with Order Size: {}. Enter market delay: {} ms, Exit market delay: {} ms", exchangeName, symbolName, orderSize, enterMarketDelay, exitMarketDelay);
        executorsService = Executors.newSingleThreadScheduledExecutor();

        book = new Book(marketDataDictionary.getSymbol(symbolName));

    }

    private void doAppStart() {
        if (logger.isInfoEnabled()) logger.info("Starting the application");
        Credentials credentials = Utils.getMarketDataSessionCredentials(config);
        Message logon = messagesFactory.getLogon(credentials.getUsername(), credentials.getPassword());
        marketDataSession.logonAsInitiator(credentials.getHost(), credentials.getPort(), logon);
        if (logger.isDebugEnabled()) logger.debug("Sent Logon message to market data session");
        //Lets send Logon to the trading session
        tradingSessionCredentials = Utils.getTradingSessionCredentials(config);
        logon = messagesFactory.getLogon(tradingSessionCredentials.getUsername(), tradingSessionCredentials.getPassword());
        tradingSession.logonAsInitiator(tradingSessionCredentials.getHost(), tradingSessionCredentials.getPort(), logon);
        if (logger.isDebugEnabled()) logger.debug("Sent Logon message trading session");
    }

    private void processStateEvent(StateChangedEvent event) {
        if (logger.isDebugEnabled()) logger.debug("Received {}", event);
        switch (event.getCurrent()) {
            case APP_START:
                doAppStart();
                break;
            case MD_DISCONNECTED:
                if (logger.isInfoEnabled()) logger.info("Market data session disconnected");
                book.reset();
                marketDataSessionState = event.getCurrent();
                break;
            case MD_CONNECTING:
                marketDataSessionState = event.getCurrent();
                break;
            case MD_CONNECTED:
                marketDataSessionState = event.getCurrent();
                //Connection to market data session has been established so we can send subscription request
                subscribeOnBookUpdates();
                break;
            case MD_WAIT_FOR_DATA:
                marketDataSessionState = event.getCurrent();
                break;
            case MD_READY:
                marketDataSessionState = event.getCurrent();
                if (tradingSessionState == State.ORD_READY) {
                    startTrading();
                }
                break;
            case ORD_DISCONNECTED:
                tradingSessionState = event.getCurrent();
                if (logger.isInfoEnabled()) logger.info("Trading session disconnected");
                break;
            case ORD_CONNECTING:
                tradingSessionState = event.getCurrent();
                break;
            case ORD_CONNECTED:
                tradingSessionState = event.getCurrent();
                requestPositions();
                break;
            case ORD_POS_SYNCING:
                tradingSessionState = event.getCurrent();
                break;
            case ORD_ORD_SYNCING:
                tradingSessionState = event.getCurrent();
                break;
            case ORD_READY:
                tradingSessionState = event.getCurrent();
                if (marketDataSessionState == State.MD_READY) {
                    startTrading();
                }
                break;
            case APP_ENTER_MARKET:
                placeOrder();
                break;
            case APP_EXIT_MARKET:
                cancelOrder();
                break;
            default:
                logger.error("Received Event in unsupported state '{}'", event.getCurrent());
        }
    }

    private void requestPositions() {
        if (logger.isDebugEnabled()) logger.debug("Requesting positions for Exchange '{}'", exchangeName);
        Message msg = messagesFactory.getRequestForPositions(tradingSessionCredentials.getLoginId(), exchangeName);
        tradingSession.send(msg);
        totalPositions = 0;
        positionsReceived = 0;
        emit(new StateChangedEvent.Builder().previous(State.ORD_CONNECTED).current(State.ORD_POS_SYNCING).build());
    }

    private void processBookUpdates(BookChangedEvent event) {
        if (logger.isDebugEnabled()) logger.debug("Received {}", event);
        if (event instanceof IncrementalMarketDataUpdate) {
            book.processEvents(((IncrementalMarketDataUpdate) event).getEvents());
        } else if (event instanceof MarketDataSnapshot) {
            book.processEvents(((MarketDataSnapshot) event).getEvents());
            emit(new StateChangedEvent.Builder().previous(State.MD_WAIT_FOR_DATA).current(State.MD_READY).build());
        }
    }

    private void processOrdersEvent(OrdersEvent event) {
        if (logger.isDebugEnabled()) logger.debug("Received {}", event);
        if (event instanceof ExecutionReport) {
            processExecutionReport((ExecutionReport) event);
        } else if (event instanceof RequestForPositionsAck) {
            RequestForPositionsAck ack = (RequestForPositionsAck) event;
            if (ack.isSuccess()) {
                if (ack.getTotalPositions() == 0) {
                    //No positions, moving forward to orders synchronization
                    if (logger.isInfoEnabled())
                        logger.info("No positions found, move to the Orders Synchronization step");
                    Message msg = messagesFactory.getOrderMassStatusRequest(tradingSessionCredentials.getLoginId());
                    tradingSession.send(msg);
                    emit(new StateChangedEvent.Builder().previous(State.ORD_POS_SYNCING).current(State.ORD_ORD_SYNCING).build());
                } else {
                    totalPositions = ack.getTotalPositions();
                    if (logger.isInfoEnabled())
                        logger.info("Request for Positions was successfully executed, we should expect to receive {} position reports", ack.getTotalPositions());
                }
            } else {
                logger.error("Can't synchronize positions, application will be stopped");
            }
        } else if (event instanceof OrderMassStatusRequestAck) {
            OrderMassStatusRequestAck ack = (OrderMassStatusRequestAck) event;
            if (ack.isSuccess()) {
                if (logger.isInfoEnabled())
                    logger.info("All open orders have been synchronized, Trading session is ready!");
                emit(new StateChangedEvent.Builder().previous(State.ORD_ORD_SYNCING).current(State.ORD_READY).build());
            } else {
                logger.error("Can't synchronize orders, application should be stopped");
            }
        } else if (event instanceof PositionReport) {
            positionsReceived++;
            PositionReport report = (PositionReport) event;
            if (report.getSize() > 0)
                if (logger.isInfoEnabled()) logger.info("Position '{}': {}", report.getAssetName(), report.getSize());
            if (totalPositions == positionsReceived) {
                Message msg = messagesFactory.getOrderMassStatusRequest(tradingSessionCredentials.getLoginId());
                tradingSession.send(msg);
                emit(new StateChangedEvent.Builder().previous(State.ORD_POS_SYNCING).current(State.ORD_ORD_SYNCING).build());
            }
        }
    }

    private String getOrderInformation(Order order) {
        Symbol symbol = order.getSymbol();
        return new StringBuilder("" + order.getSide()).append(" ")
            .append(Symbol.castToDouble(order.getSize(), symbol.getSizeFactor()))
            .append(" @ ").append(symbol.getName())
            .append(order.getType() == Order.Type.MARKET ? " at MARKET" : " at " + Symbol.castToDouble(order.getPrice(), symbol.getPriceFactor()))
            .append(" on Exchange '").append(order.getExchange().getName()).append("'")
            .toString();
    }

    private void processExecutionReport(ExecutionReport report) {
        switch (report.getStatus()) {
            case PENDING_NEW:
                order.setOrderId(report.getOrderId());
                order.setStatus(Order.Status.PENDING_NEW);
                order.setLastUpdateTime(report.getReceiveTime());
                if (logger.isInfoEnabled()) logger.info("Accepted by XTRD Order ID: {} {}", order.getId(), getOrderInformation(order));

                break;
            case NEW:
                order.setStatus(Order.Status.NEW);
                order.setSecondaryOrderId(report.getSecondaryOrderId());
                order.setLastUpdateTime(report.getReceiveTime());
                if (logger.isInfoEnabled()) logger.info("Accepted by {} Order ID: {}/{}(Exchange ID: '{}') {}. Cancellation within {} ms", exchangeName, order.getId(), order.getOrderId(), order.getSecondaryOrderId(), getOrderInformation(order), exitMarketDelay);
                executorsService.schedule(() -> emit(new StateChangedEvent.Builder().previous(State.APP_START).current(State.APP_EXIT_MARKET).build()), exitMarketDelay, TimeUnit.MILLISECONDS);
                break;
            case REJECTED:
                order.setStatus(Order.Status.REJECTED);
                order.setLastUpdateTime(report.getReceiveTime());
                logger.warn("Order ID: {} {} was rejected. Reason: '{}'", order.getId(), getOrderInformation(order), report.getText());
                break;
            case CANCELED:
                if (report.getOriginalId() != 0) {
                    //We successfully canceled working order
                    if (order.getId() == report.getOriginalId()) {
                        if (logger.isInfoEnabled()) logger.info("Cancelled Order ID: {}/{}(Exchange ID: '{}') {}. New trading cycle within {} ms", new Object[]{
                            order.getId(),
                            order.getOrderId(),
                            order.getSecondaryOrderId(),
                            getOrderInformation(order),
                            enterMarketDelay
                        });
                        order = null;
                        executorsService.schedule(() -> emit(new StateChangedEvent.Builder().previous(State.APP_EXIT_MARKET).current(State.APP_ENTER_MARKET).build()), enterMarketDelay, TimeUnit.MILLISECONDS);
                    } else {
                        logger.warn("IDs mismatch between Working Order ID: {}/{} and Execution Report(ID: {}/{}, Original ID: {})", order.getId(), order.getOrderId(), report.getId(), report.getOrderId(), report.getOriginalId());
                    }
                } else {
                    //Our trading order has been canceled for some reason
                    logger.warn("Working Order ID: {}/{} was unexpectedly canceled: '{}'", order.getId(), order.getOrderId(), report.getText());
                }
                break;
            default:
                logger.error("Received ExecutionReport {} in unsupported status '{}'", report, report.getStatus());
        }
    }

    protected void processMessage(IMessage msg) {
        if (msg instanceof StateChangedEvent) {
            processStateEvent((StateChangedEvent) msg);
        } else if (msg instanceof BookChangedEvent) {
            processBookUpdates((BookChangedEvent) msg);
        } else if (msg instanceof OrdersEvent) {
            processOrdersEvent((OrdersEvent) msg);
        }
    }

    private void subscribeOnBookUpdates() {
        if (logger.isDebugEnabled())
            logger.debug("Creating MarketDataRequest to subscribe on updates on '{}' on Exchange '{}'", symbolName, exchangeName);
        Message msg = messagesFactory.getMarketDataRequest(symbolName, exchangeName);
        marketDataSession.send(msg);
        //Loop back current state change for market data session
        emit(new StateChangedEvent.Builder().previous(State.MD_CONNECTED).current(State.MD_WAIT_FOR_DATA).build());
    }

    private void startTrading() {
        if (logger.isInfoEnabled()) logger.info("Both market data and trading sessions are ready. Lets ROCK!");
        emit(new StateChangedEvent.Builder().previous(State.UNDEFINED).current(State.APP_ENTER_MARKET).build());
    }

    private void placeOrder() {
        Order.Side side = Order.Side.BUY;
        long price = getPrice(side);

        Symbol symbol = marketDataDictionary.getSymbol(symbolName);
        Exchange exchange = marketDataDictionary.getExchange(exchangeName);

        order = new Order();
        order.setId(idGenerator++);
        order.setLoginId(tradingSessionCredentials.getLoginId());
        order.setCreateTime(io.xtrd.samples.neat_shooter.common.Utils.getTimestamp());
        order.setSymbol(symbol);
        order.setExchange(exchange);
        order.setType(Order.Type.LIMIT);
        order.setSide(side);
        order.setSize(Symbol.castToLong(orderSize, symbol.getSizeFactor()));
        order.setPrice(price);
        order.setStatus(Order.Status.UNDEFINED);

        Message msg = messagesFactory.getNewOrderSingle(order);
        tradingSession.send(msg);
    }

    private void cancelOrder() {
        if (logger.isDebugEnabled()) logger.debug("Processing request to cancel order");
        if (tradingSessionState == State.ORD_READY) {
            if (order != null) {
                switch (order.getStatus()) {
                    case NEW:
                    case PENDING_NEW:
                    case PARTIALLY_FILLED:
                        //Order in these states can be canceled
                        Message msg = messagesFactory.getOrderCancelRequest(idGenerator++, order);
                        tradingSession.send(msg);
                        if (logger.isDebugEnabled()) logger.debug("Sent request to cancel Order ID: {}", order.getId());
                        break;
                    default:
                        logger.warn("Can't cancel Order ID: {}/{} because it is in the status {}", order.getId(), order.getOrderId(), order.getStatus());
                }
            }
        } else {
            logger.warn("Order cancel request will be ignored because Trading session is disconnected");
        }
    }

    public void emit(StateChangedEvent event) {
        queue.add(event);
    }

    @Override
    public void onBookChangedEvent(BookChangedEvent event) {
        queue.add(event);
    }

    @Override
    public void onOrdersEvent(OrdersEvent event) {
        queue.add(event);
    }

    private class Worker implements Runnable {
        public void run() {
            IMessage msg = null;
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    msg = queue.take();
                    processMessage(msg);
                } catch (InterruptedException e) {
                    if (logger.isInfoEnabled()) logger.info("Received STOP signal, wrapping up all operations");
                    Thread.currentThread().interrupt();
                } catch (Exception e) {
                    logger.error("Error during processing message {}: {}", msg, e.getMessage(), e.getStackTrace());
                }
            }
        }
    }
}
