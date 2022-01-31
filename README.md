![XTRD Logo](https://xtrd.io/wp-content/uploads/2018/11/xtrd_logo_transparent_600.png)
# XTRD Samples
XTRD FIX API usage examples - market data, trading, and beyond 
* * * 
## Motivation
The key idea behind this public repository is to provide a centralized point of XTRD FIX API usage examples. We are going to cover different aspects of trading starting from market data, followed by trading, and post-trades settlements. 

Our team is using [OnixS](https://www.onixs.biz/) FIX Engine but we also will provide samples on top of [QuickFIX](http://www.quickfixengine.org/) and, probably, [Fix8](http://www.fix8.org/). 

## Documentation
* [XTRD FIX API for Market Data](https://xtrd.io/fix-api-specification-market-data/)
* [XTRD FIX API for Trading](https://xtrd.io/fix-api-specification-orders/)
* [XTRD PUBLIC API](https://bitbucket.org/xtrd/xtrd_demos/src/master/md_reader/src/XTRD_PUBLIC_API.md)

##Samples

|Project name | Language | Engine | Description|
|---|---|---|---|
|[Neat Shooter](https://bitbucket.org/xtrd/xtrd_demos/src/master/neat_shooter/) | Java| OnixS | An application that combines both market data and trading functions by reading Huobi market data over the FIX API and constantly sends requests to open and cancel orders. |
|[Pythod Trader](https://bitbucket.org/xtrd/xtrd_demos/src/master/python_trader)|Python|QuickFIX|Python-based application that illustrates basic techniques of a trading workflow - getting open orders, positions synchronization, sending and canceling orders, parsing ExecutionReports|
|[JavaScript Trader](https://bitbucket.org/xtrd/xtrd_demos/src/master/js_trader/)|JavaScript/node.js|jspurefix|JavaScript-based application similar to the Neat Shooter - get market data, send orders based on certain conditions and receive confirmations. JavaScript, node.js, FIX|
|[Renko-based Scalper for Binance](https://bitbucket.org/xtrd/xtrd_demos/src/master/renko-scalper/)|Java/JavaScript|QuickFIX|Demo application shows how to receive market data, generate renkos, and build an execution system over the FIX.  It also has a simple GUI to track the progress.|
|[md_reader #1](https://bitbucket.org/xtrd/xtrd_demos/src/master/md_reader/) | Java| OnixS | An application that constantly subscribes on pre-defined symbols list, reads the feed for during some amount(randomly selected) of time, then disconnects and connects again. |
|[md_reader #2](https://bitbucket.org/xtrd/xtrd_demos/src/master/market_data/onixs-cpp/) | C++ | OnixS | Application sample that uses OnixS FIX engine library to subscribe and parse market data. |
|[md_reader #3](https://bitbucket.org/xtrd/xtrd_demos/src/master/market_data/quickfix-cpp/) | C++ | QuickFIX |  A very simple application that uses QuickFIX library. Connects to market data streamer, subscribe and parse incoming MarketData - Snapshot/FullRefresh and MarketData - IncrementalRefresh  messages.|
|[md_reader #4](https://bitbucket.org/xtrd/xtrd_demos/src/master/market_data/fix8-cpp/) | C++ | Fix8 |  A very simple application that uses Fix8 library. Connects to market data streamer, subscribe and parse incoming MarketData - Snapshot/FullRefresh and MarketData - IncrementalRefresh  messages.|


