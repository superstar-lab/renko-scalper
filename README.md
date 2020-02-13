![XTRD Logo](https://xtrd.io/wp-content/uploads/2018/11/xtrd_logo_transparent_600.png)
# XTRD Samples
XTRD FIX API usage examples - market data, trading, and beyond 
* * * 
## Motivation
The key idea behind this public repository is to provide a centralized point of XTRD FIX API usage examples. We are going to cover different aspects of trading starting from market data, followed by trading, and post-trades settlements. 

Our team is using [OnixS](https://www.onixs.biz/) FIX Engine but we also will provide samples on top of [QuickFIX](http://www.quickfixengine.org/) and, probably, [Fix8](http://www.fix8.org/). 

## Documentation
* [XTRD FIX API for Market Data](https://bitbucket.org/xtrd/xtrd_demos/wiki/api/marketdata)
* [XTRD FIX API for Trading](https://bitbucket.org/xtrd/xtrd_demos/wiki/api/trading)
* [XTRD PUBLIC API](https://bitbucket.org/xtrd/xtrd_demos/src/master/md_reader/src/XTRD_PUBLIC_API.md)

##Samples

Project name | Language | Engine | Description
- | - | - | - |
[Neat Shooter](https://bitbucket.org/xtrd/xtrd_demos/src/master/neat_shooter/) | Java| OnixS | An application that combines both market data and trading functions by reading Huobi market data over the FIX API and constantly sends requests to open and cancel orders. 
[md_reader #1](https://bitbucket.org/xtrd/xtrd_demos/src/master/md_reader/) | Java| OnixS | An application that constantly subscribes on pre-defined symbols list, reads the feed for during some amount(randomly selected) of time, then disconnects and connects again. 
[md_reader #2](https://bitbucket.org/xtrd/xtrd_demos/src/master/market_data/onixs-cpp/) | C++ | OnixS | Application sample that uses OnixS FIX engine library to subscribe and parse market data. 
