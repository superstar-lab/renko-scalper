package io.xtrd.samples.neat_shooter;

import biz.onixs.fix.dictionary.Version;
import biz.onixs.fix.engine.Engine;
import biz.onixs.fix.engine.Session;
import biz.onixs.util.settings.PropertyBasedSettings;
import io.xtrd.samples.neat_shooter.fix.Credentials;
import io.xtrd.samples.neat_shooter.fix.MessagesFactory;
import io.xtrd.samples.neat_shooter.fix.MessagesNormalizer;
import io.xtrd.samples.neat_shooter.fix.Utils;
import io.xtrd.samples.neat_shooter.fix.md.MarketDataListener;
import io.xtrd.samples.neat_shooter.fix.ord.OrdersListener;
import io.xtrd.samples.neat_shooter.md.MarketDataDictionary;
import io.xtrd.samples.neat_shooter.msgs.StateChangedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileReader;
import java.util.Properties;

public class Core {
    private final Logger logger = LoggerFactory.getLogger(Core.class);
    private Properties config = null;
    private Engine engine;
    private Brain brain;
    private Version customDialect;
    private Session marketDataSession = null;
    private Session tradingSession = null;
    private MessagesFactory messagesFactory = null;
    private MarketDataDictionary marketDataDictionary = null;
    private MessagesNormalizer messagesNormalizer = null;

    public void init(String configName) throws Exception {
        config = new Properties();
        config.load(new FileReader(configName));

        initFixEngine();

        brain = new Brain();

        marketDataDictionary = new MarketDataDictionary();
        marketDataDictionary.init();

        messagesNormalizer = new MessagesNormalizer();
        messagesNormalizer.setMarketDataDictionary(marketDataDictionary);
        messagesNormalizer.init();

        customDialect = Version.getById(config.getProperty(Constants.XTRD_FIX_DIALECT));
        messagesFactory = new MessagesFactory();
        messagesFactory.setDialect(customDialect);
        initMarketDataSession();
        initTradingSession();


        brain.setConfig(config);
        brain.setMarketDataSession(marketDataSession);
        brain.setTradingSession(tradingSession);
        brain.setMessagesFactory(messagesFactory);
        brain.setMarketDataDictionary(marketDataDictionary);
        brain.init();
    }

    private void initMarketDataSession() {
        Credentials credentials = Utils.getMarketDataSessionCredentials(config);
        marketDataSession = new Session(credentials.getSenderCompId(), credentials.getTargetCompId(), customDialect);
        MarketDataListener listener = new MarketDataListener();
        listener.setEmitter(brain);
        listener.setMarketDataListener(brain);
        listener.setMessagesNormalizer(messagesNormalizer);
        marketDataSession.setInboundApplicationMessageListener(listener);
        marketDataSession.addStateChangeListener(listener);
    }

    private void initTradingSession() {
        Credentials credentials = Utils.getTradingSessionCredentials(config);
        tradingSession = new Session(credentials.getSenderCompId(), credentials.getTargetCompId(), customDialect);
        OrdersListener listener = new OrdersListener();
        listener.setEmitter(brain);
        listener.setOrdersEventListener(brain);
        listener.setMessagesNormalizer(messagesNormalizer);
        tradingSession.setInboundApplicationMessageListener(listener);
        tradingSession.addStateChangeListener(listener);
    }

    private void initFixEngine() throws Exception {
        String fixEngineSettingsFile = config.getProperty(Constants.FIX_ENGINE_SETTINGS, "");
        if (fixEngineSettingsFile.length() == 0) throw new Exception("Can't find FIX engine settings");
        PropertyBasedSettings settings = new PropertyBasedSettings(fixEngineSettingsFile);
        engine = Engine.init(settings);
        logger.info("Started {}", engine.getProductNameAndVersion());
    }

    public void start() {
        if(brain != null) {
            brain.start();
        } else {
            throw new RuntimeException("Can't start Brain");
        }
        //Send "GO" signal
        brain.emit(new StateChangedEvent.Builder().current(State.APP_START).build());

    }

    public void stop() {
        if(brain != null) brain.stop();
    }
}
