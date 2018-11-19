package io.xtrd.samples.md_reader;

import biz.onixs.fix.dictionary.Version;
import biz.onixs.fix.engine.Engine;
import biz.onixs.fix.engine.Session;
import biz.onixs.fix.engine.SessionState;
import biz.onixs.fix.parser.Message;
import biz.onixs.util.settings.PropertyBasedSettings;
import io.xtrd.samples.md_reader.link.Listener;
import io.xtrd.samples.md_reader.link.MessagesFactory;
import io.xtrd.samples.md_reader.tasks.Subscribe;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Core {
    private final Logger logger = LoggerFactory.getLogger(Core.class);
    private Properties config = null;
    private Engine engine;
    private Session session;
    private Listener listener = null;
    private MessagesFactory messagesFactory = new MessagesFactory();
    private ScheduledExecutorService workers = null;
    private Context context = null;
    private List<Symbol> symbols = new ArrayList();

    public void init(String configName) throws Exception {
        config = new Properties();
        config.load(new FileReader(configName));
        workers = Executors.newScheduledThreadPool(2);
        context = new Context(config, workers, messagesFactory);
        initFixEngine();
        initSession();
        loadSymbols();
    }

    private void loadSymbols() {
        String pairs[] = config.getProperty(ConfigKeys.SYMBOLS).split(",");
        for(int i = 0;i < pairs.length;i++) {
            String symbolParts[] = pairs[i].split(" ");
            Symbol symbol = new Symbol(symbolParts[0], symbolParts[1]);
            symbols.add(symbol);
            if(logger.isDebugEnabled()) logger.debug("Loaded Symbol {}", symbol);
        }
    }

    public void start() {
        String host = config.getProperty(ConfigKeys.HOST, "");
        int port = Integer.parseInt(config.getProperty(ConfigKeys.PORT, "0"));
        String username = config.getProperty(ConfigKeys.USERNAME, "");
        String password = config.getProperty(ConfigKeys.PASSWORD, "");
        if(logger.isDebugEnabled()) logger.debug("Connecting to {}:{} with username: '{}'", host, port, username);

        Message logon = messagesFactory.getLogon(username, password, 10);
        session.logonAsInitiator(host, port, logon);
    }

    public void stop() {

    }

    private void initFixEngine() throws Exception {
        String fixEngineSettingsFile = config.getProperty(ConfigKeys.FIX_ENGINE_SETTINGS, "");
        if(fixEngineSettingsFile.length() == 0) throw new Exception("Can't find FIX engine settings");
        PropertyBasedSettings settings = new PropertyBasedSettings(fixEngineSettingsFile);

        engine = Engine.init(settings);
    }

    private void initSession() {
        String senderCompId = config.getProperty(ConfigKeys.SENDER_COMP_ID, "");
        String targetCompId = config.getProperty(ConfigKeys.TARGET_COMP_ID, "");
        if(logger.isDebugEnabled()) logger.debug("Creating session {}/{}", senderCompId, targetCompId);
        listener = new Listener();

        session = new Session(senderCompId, targetCompId, Version.FIX44);
        session.setInboundApplicationMessageListener(listener);
        session.addStateChangeListener((sender, args) -> {
            if(args.getNewState() == SessionState.ESTABLISHED) {
                //Connection is established, lets initiate market data subscriptions
                symbols.forEach(symbol -> workers.schedule(new Subscribe(context.getNextId(), symbol, session, context), 0, TimeUnit.SECONDS));
            }
        });
    }
}
