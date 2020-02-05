package io.xtrd.samples.neat_shooter.fix;

import io.xtrd.samples.neat_shooter.Constants;

import java.util.Properties;

public class Utils {
    public static Credentials getMarketDataSessionCredentials(Properties config) {
        Credentials result = new Credentials();
        for(String key : new String[]{
            Constants.FIX_MARKET_DATA_HOST,
            Constants.FIX_MARKET_DATA_PORT,
            Constants.FIX_MARKET_DATA_SENDER_COMP_ID,
            Constants.FIX_MARKET_DATA_TARGET_COMP_ID,
            Constants.FIX_MARKET_DATA_USERNAME,
            Constants.FIX_MARKET_DATA_PASSWORD
        }) {
            if (!config.containsKey(key)) throw new RuntimeException(key + " is not provided");
        }

        result.setHost(config.getProperty(Constants.FIX_MARKET_DATA_HOST));
        result.setPort(Integer.parseInt(config.getProperty(Constants.FIX_MARKET_DATA_PORT)));
        result.setSenderCompId(config.getProperty(Constants.FIX_MARKET_DATA_SENDER_COMP_ID));
        result.setTargetCompId(config.getProperty(Constants.FIX_MARKET_DATA_TARGET_COMP_ID));
        result.setUsername(config.getProperty(Constants.FIX_MARKET_DATA_USERNAME));
        result.setPassword(config.getProperty(Constants.FIX_MARKET_DATA_PASSWORD));

        return result;
    }

    public static Credentials getTradingSessionCredentials(Properties config) {
        Credentials result = new Credentials();
        for(String key : new String[]{
            Constants.FIX_ORDERS_HOST,
            Constants.FIX_ORDERS_PORT,
            Constants.FIX_ORDERS_SENDER_COMP_ID,
            Constants.FIX_ORDERS_TARGET_COMP_ID,
            Constants.FIX_ORDERS_USERNAME,
            Constants.FIX_ORDERS_PASSWORD,
            Constants.FIX_ORDERS_LOGIN
        }) {
            if (!config.containsKey(key)) throw new RuntimeException(key + " is not provided");
        }

        result.setHost(config.getProperty(Constants.FIX_ORDERS_HOST));
        result.setPort(Integer.parseInt(config.getProperty(Constants.FIX_ORDERS_PORT)));
        result.setSenderCompId(config.getProperty(Constants.FIX_ORDERS_SENDER_COMP_ID));
        result.setTargetCompId(config.getProperty(Constants.FIX_ORDERS_TARGET_COMP_ID));
        result.setUsername(config.getProperty(Constants.FIX_ORDERS_USERNAME));
        result.setPassword(config.getProperty(Constants.FIX_ORDERS_PASSWORD));
        result.setLoginId(Integer.parseInt(config.getProperty(Constants.FIX_ORDERS_LOGIN)));

        return result;
    }
}
