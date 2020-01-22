# PUBLIC API Specification - Market Data
  
* [Get all exchanges](#markdown-header-get-all-exchanges)  
* [Get exchange](#markdown-header-get-exchange)  
* [Get assets](#markdown-header-get-assets) 
* [Get asset](#markdown-header-get-asset) 
* [Get symbols](#markdown-header-get-symbols) 
* [Get symbol](#markdown-header-get-symbol) 
* [Get snapshot](#markdown-header-get-snapshot) 
* [Return Codes](#markdown-header-return-codes) 
	
***
[return on start page](https://bitbucket.org/xtrd/xtrd_demos/src/master/)
***
#### Get all exchanges
###### Description: method to return a list of all available exchanges 
URL: /rest/exchanges
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges](https://telescope.xtrd.io/rest/exchanges)

##### Response 

~~~ [{
            "id": 110,
            "name": "GEMINI",
            "assets_num": 300,
            "symbols_num": 400
        },
        {
            "id": 113,
            "name": "OKEX",
            "assets_num": 300,
            "symbols_num": 400
        },
    /*.....*/
    ]
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***



#### Get exchange
###### Description: method to extract detailed information about particular exchange
URL: /rest/exchanges/[EXCHANGE] 
###### EXCHANGE could be name or id
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges/9](https://telescope.xtrd.io/rest/exchanges/9)
* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE](https://telescope.xtrd.io/rest/exchanges/BINANCE)

##### Response 

~~~ {
        "id": 9,
        "name": "BINANCE",
        "properties": {
            "jurisdiction": "USA",
            "twitter": "https://twitter.com/Gemini",
            "facebook": "https://....",
            "linkedin": "https://www.linkedin.com/company/geminitrust/",
            ...
        }
    }
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***

#### Get assets
###### Description: method to extract all assets on a particular exchange
URL: /rest/exchanges/[EXCHANGE]/assets
###### EXCHANGE could be name or id
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges/9/assets](https://telescope.xtrd.io/rest/exchanges/9/assets)
* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE](https://telescope.xtrd.io/rest/exchanges/BINANCE)

##### Response 

~~~ 
[
{
            "id": 102,
            "name": "ETH",
            "type": "dtl"
        },
        {
            "id": 503,
            "name": "USD",
            "type": "fiat"
        },
    /*.....*/
    ]
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***



#### Get asset
###### Description: method to get information about a particular asset 
URL: /rest/exchanges/[EXCHANGE]/assets/[ASSET]
###### EXCHANGE could be name or id
###### ASSET could be name or id
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges/9/assets/1033292/](https://telescope.xtrd.io/rest/exchanges/9/assets/1033292/)
* GET [https://telescope.xtrd.io/rest/exchanges/9/assets/ETH/](https://telescope.xtrd.io/rest/exchanges/9/assets/ETH/)

##### Response 

~~~ 
{
  "id": 1033292,
  "name": "ETH",
  "native_name": "ETH",
  "type": "crypto",
  "properties": {}
}
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***


#### Get symbols
###### Description: method to extract a list of instruments traded on a particular exchange 
URL: /rest/exchanges/[EXCHANGE]/symbols
###### EXCHANGE could be name or id
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols](https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols)
* GET [https://telescope.xtrd.io/rest/exchanges/9/symbols](https://telescope.xtrd.io/rest/exchanges/9/symbols)

##### Response 

~~~ 
[
  {
    "id": 1146933,
    "name": "MTL/ETH"
  },
  {
    "id": 1146929,
    "name": "ERD/BTC"
  },
  {
    "id": 1176396,
    "name": "TROY/USDT"
  },
    /*.....*/
    ]
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***



#### Get symbol
###### Description: get detailed information about a particular symbol
URL: /rest/exchanges/`[EXCHANGE]`/symbols/`[SYMBOL]`
###### EXCHANGE could be name or id
###### SYMBOL could be name or id , where symbol name = `[base asset name]` - `[quote asset name]` 
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/1147691](https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/1147691)
* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/eth-eur](https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/eth-eur)

##### Response 

~~~ 
{
  "id": 1147691,
  "name": "ETH/EUR",
  "native_name": "ETHEUR",
  "base": {
    "id": 1033292,
    "name": "ETH",
    "type": "crypto"
  },
  "quote": {
    "id": 1033723,
    "name": "EUR",
    "type": "crypto"
  },
  "properties": {}
}
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***

#### Get snapshot
###### Description: get snapshot
URL: /rest/exchanges/`[EXCHANGE]`/symbols/`[SYMBOL]`/ordersbook
###### EXCHANGE could be name or id
###### SYMBOL could be name or id
##### Request 

* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/1147691/ordersbook](https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/1147691/ordersbook)
* GET [https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/eth-eur/ordersbook](https://telescope.xtrd.io/rest/exchanges/BINANCE/symbols/eth-eur/ordersbook)

##### Response 

~~~ 
{
  "bids": [
    {
      "price": 0.0134,
      "size": 2.0
    },
    {
      "price": 0.0129,
      "size": 7.0
    },
    {
      "price": 0.00022,
      "size": 1.0
    }
  ],
  "asks": [
    {
      "price": 0.01391,
      "size": 4.0
    },
    {
      "price": 0.01416,
      "size": 13.0
    },
    {
      "price": 0.01441,
      "size": 21.0
    }
  ]
}
~~~

[top of page](#markdown-header-public-api-specification-market-data)

***

#### Return Codes
| Code | Description                                                |
|:----: |:----                                                      |
|200    | Request successfully executed                             |
|401    | The incorrect token provided(in case if it really exists) |
|404    | Exchange, Asset or Symbol not found                       |
|429    | Too many requests                                         |

[top of page](#markdown-header-public-api-specification-market-data)

***

*** 

[return on start page](https://bitbucket.org/xtrd/xtrd_demos/src/master/)