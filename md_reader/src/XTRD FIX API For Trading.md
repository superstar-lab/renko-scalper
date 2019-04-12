#FIX API Specification - Orders

* Order states diagram
* Dictionaries
	* Security Type
	* Order Types
	* Order Sides
	* Time in Force
* Messages
	* Logon
	* Logout
	* NewOrderSingle
	* OrderCancelRequest
	* OrderCancelReject
	* ExecutionReport
	* OrderMassStatusRequest

##Order states diagram
![Alt text](https://bitbucket.org/xtrd/xtrd_demos/raw/a233b52f193443871de90bc6ca63b965f458f40a/md_reader/src/repo/2.png)
##Dictionaries
###Security Type

|   Type                     | Value    | Description                                  |
|:---------------------------|:-------- |:---------------------------------------------|
| Foreign Exchange Contract  | FOR      | All crypto to crypto, crypto to fiat or  Y   |
|                            |          | fiat to fiat pairs                           |

###Order Types

|   Order Type    | Comments                                                     |
|:----------------|:-------------------------------------------------------------|
| Market(1)       | When sending market orders, Price or StopPx is not           |
|                 | required to be set                                           |
| Limit(2)        | When sending limit orders, Price(44) field is required to be |
|                 | set                                                          |
| Stop(3)         | For Stop orders, corresponding stop price should be set in   |
|                 | the StopPx(99) field                                         |

###Order Sides

Supported 3 sides:  
	* Buy(1)  
	* Sell(2)  
###Time in Force

|    Type                | Comments                                                     |
|:-----------------------|:-------------------------------------------------------------|
| Day(0)                 | If order becomes pending, it will be canceled at the end of  |
|                        | the trading session                                          |
| Good Till Cancel(1)    |                                                              |
| Immediate Or Cancel(3) | Limit order will be executed at an exact price or better     |
|                        | immediately, else will be canceled                           |
| Fill Or Kill(4)        | Order will be filled for the quantity specified in OrderQt,  |
|                        | else will be canceled                                        |

##Messages

###Logon

|  Tag     | Field Name            | Required | Comments                       | Example             |
|:---------|:--------------------- |:--------:| :------------------------------|:--------------------|
| 98       | EncrypMethod          |   Y      | Always set to None(0)          | 98=0                |
| 108      | HeartBtInt            |   Y      | Heartbeat interval, always 30s | 108=30              |
| 553      | Username              |   Y      |                                | 553=1001            |
| 554      | Password              |   Y      |                                | 554=Rr68twd6mw      |

###Logout

|  Tag     | Field Name            | Required | Comments                       | Example                  |
|:---------|:--------------------- |:--------:| :------------------------------|:-------------------------|
| 58       | Text                  |   N      | Optional text                  | 58=regular disconnection |

##NewOrderSingle

|  Tag     | Field Name            | Required | Comments                       | Example                  |
|:---------|:--------------------- |:--------:| :------------------------------|:-------------------------|
| 1        | Account               |   Y      | Login ID, associated           | 1=1001                   |
|          |                       |          | with given session             |                          |
| 11       | ClOrdID               |   Y      | Client assigned order ID       | 11=1234                  |
|          |                       |          |                                | 12=ORD_1234              |
| 38       | OrderQty              |   Y      | Initial Order size             | 39=0.125                 |
| 40       | OrdType               |   Y      | Type of order                  | 40=1                     |
|          |                       |          | Supported values:              |                          |
|          |                       |          | * Market(1)                    |                          |
|          |                       |          | * Limit(2)                     |                          |
|          |                       |          | * Stop(3)                      |                          |
| 44       | Price                 |   C      | Conditional field,             | 44=0.033528              |
|          |                       |          | indicating expected fill       |                          |
|          |                       |          | price.                         |                          |
|          |                       |          | Required for:                  |                          |
|          |                       |          | * Limit                        |                          |
| 99       | StopPx                |   C      | Conditional field,             | 99=0.033612              |
|          |                       |          | required for Stop order        |                          |
|          |                       |          | type                           |                          |
| 54       | Side                  |   Y      | Order side used                | 54=1                     |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * Buy(1)                       |                          |
|          |                       |          | * Sell(2)                      |                          |
| 55       | Symbol                |   Y      | Symbol name                    | 55=ETH/BTC               |
| 59       | TimeInForce           |   Y      | Control orders lifetime        | 59=0                     |
|          |                       |          | behavior.                      |                          |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * Day(0)                       |                          |
|          |                       |          | * Good till Cancel(1)          |                          |
|          |                       |          | * Immediate or Cancel(3)       |                          |
|          |                       |          | * Fill Or Kill(4)              |                          |
|          |                       |          | * Good Till Night(11)          |                          |
| 60       | TransactionTime       |   N      | Timestamp in UTC               | 60=20180912-12:05:       |
|          |                       |          | timezone when order            | 15.105                   |
|          |                       |          | was created with               |                          |
|          |                       |          | included milliseconds          |                          |
| 100      | ExDestination         |   N      | ECN or Venue name              | 100=OKEX                 |
|          |                       |          | where order will be sent       |                          |
|          |                       |          | /executed                      |                          |
| 167      | SecurityType          |   N      | Type of security to trade.     | 167=FOR                  |
|          |                       |          | Supported values:              |                          |
|          |                       |          | FOR - Foreign exchange         |                          |
|          |                       |          | conract                        |                          |

##OrderCancelRequest  
  
OrderCancelRequest is used to cancel the order in its entirety. Only orders in NEW or PARTIALLY_FILLED statuses can be canceled.  
  
If you need to cancel only a part of the non-filled amount (leaves quantity), please refer to OrderCancelReplaceRequest.  

|  Tag     | Field Name            | Required | Comments                       | Example                  |
|:---------|:--------------------- |:--------:| :------------------------------|:-------------------------|
| 1        | Account               |   Y      | Trader, which hold             | 1=1001                   |
|          |                       |          | particular order to cancel     |                          |
| 11       | ClOrdID               |   Y      | Client order ID for            | 11=1234                  |
|          |                       |          | cancel operation               |                          |
| 37       | OrderID               |   Y      | OrderID which should           | 37=312351044             |
|          |                       |          | be canceled                    |                          |
| 41       | OrigClOrdID           |   Y      | Client order ID of order       | 41=1233               |
|          |                       |          | which should be                |                          |
|          |                       |          | canceled                       |                          |
| 54       | Side                  |   Y      | Order side of order,           | 51=1                     |
|          |                       |          | identified by                  |                          |
|          |                       |          | OrigClOrdID/OrderID            |                          |
| 60       | TransactionTime       |   Y      | Timestamp in UTC               | 60=20180912-12:05:       |
|          |                       |          | timezone when an order         | 15.105                   |
|          |                       |          | was created with               |                          |
|          |                       |          | included milliseconds          |                          |


##OrderCancelReject

This message will be sent by the server in response to OrderCancelRequest if the operation failed for some reason.  

|  Tag     | Field Name            | Required | Comments                       | Example                  |
|:---------|:--------------------- |:--------:| :------------------------------|:-------------------------|
| 1        | Account               |   Y      |                                | 1=1001                   |
| 11       | ClOrdID               |   C      | ID of client order which       | 11=CCL_001               |
|          |                       |          | was used to perform            |                          |
|          |                       |          | cancel operation               |                          |
| 41       | OrigClOrdID           |   C      | ID of canceling client         | 41=TRD_00231             |
|          |                       |          | order                          |                          |
| 37       | OrderID               |   C      | Order ID on Rational           | 37=1123423               |
|          |                       |          | Route Server side              |                          |
| 102      | CxlRejReason          |   C      | Supported Values:              | 102=0                    |
|          |                       |          | 0- Too late to cancel          |                          |
|          |                       |          | 1- Unknown order(send          |                          |
|          |                       |          | when at least one of           |                          |
|          |                       |          | order related fields are       |                          |
|          |                       |          | missed, contains               |                          |
|          |                       |          | incorrect information or       |                          |
|          |                       |          | order can't be found)          |                          |
|          |                       |          | 2- Broker/Exchange option      |                          |
|          |                       |          | 99 - Other                     |                          |
| 434      | CxlRejResponseTo      |   C      | Supported Values:              | 434=1                    |
|          |                       |          | 1- OrderCancelRequest          |                          |
| 58       | Text                  |   C      | Textual comments about         | 58=Can't cancel filled   |
|          |                       |          | rejection reason               | order                    |
| 60       | TransactionTime       |   C      | Timestamp in UTC               | 60=20180912-12:15:       |
|          |                       |          | timezone when Order            | 15.105                   |
|          |                       |          | can rejected                   |                          |

##ExecutionReport

|  Tag     | Field Name            | Required | Comments                       | Example                  |
|:---------|:--------------------- |:--------:| :------------------------------|:-------------------------|
| 1        | Account               |   Y      | Login ID, associated           | 1=1001                   |
|          |                       |          | with a given session           |                          |
| 11       | ClOrdID               |   Y      | Client assigned order ID       | 11=1234                  |
|          |                       |          |                                | 12=ORD_1234              |
| 37       | OrderID               |   Y      | Order ID on our side           | 37=312351043             |
| 17       | ExecID                |   Y      | Order execution ID             | 17=4000123541            |
| 40       | OrdType               |   Y      | Order Type (Market,            | 40=1                     |
|          |                       |          | Limit, Stop, etc)              |                          |
| 44       | Price                 |   C      | Conditional field,             | 44=0.033953              |
|          |                       |          | indicating expected fill       |                          |
|          |                       |          | price for Limit orders         |                          |
| 99       | StopPx                |   C      | Conditional field, used        | 88=0.033500              |
|          |                       |          | only for Stop orders           |                          |
|          |                       |          | (OrdType=3)                    |                          |
| 54       | Side                  |   Y      | Order side used                | 54=1                     |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * Buy(1)                       |                          |
|          |                       |          | * Sell(2)                      |                          |
| 55       | Symbol                |   Y      | Symbol name                    | 55=ETH/BTC               |
| 39       | OrdStatus             |   Y      | Reports current order statys   | 39=2                     |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * NEW(0)                       |                          |
|          |                       |          | * PARTIALLY FILLED(1)          |                          |
|          |                       |          | * FILLED(2)                    |                          |
|          |                       |          | * CANCELED(4)                  |                          |
|          |                       |          | * REJECTED(8)                  |                          |
| 150      | ExecType              |   Y      | Reports current                | 150=F                    |
|          |                       |          | execution status:              |                          |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * NEW(0)                       |                          |
|          |                       |          | * TRADE(F)                     |                          |
|          |                       |          | * CANCELED(4)                  |                          |
|          |                       |          | * REJECTED(8)                  |                          |
| 6        | AvgPx                 |   Y      | Average price of all           | 6=0.033959               |
|          |                       |          | executed parts(in case         |                          |
|          |                       |          | of partial fills)              |                          |
| 31       | LastPx                |   Y      | Price of last executed         | 31=0.033951              |
|          |                       |          | part. If order fully filled    |                          |
|          |                       |          | at once, LastPx will be        |                          |
|          |                       |          | same as AvgPx                  |                          |
| 32       | LastQty               |   Y      | Last executed size.            | 32=0.100                 |
| 14       | CumQty                |   Y      | Total executed quantity        | 14=0.200                 |
|          |                       |          | for a given order (sum of      |                          |
|          |                       |          | all fills)                     |                          |
| 151      | LeavesQty             |   Y      | Indicates quantity of          | 151=0.300                |
|          |                       |          | order still not-executed       |                          |
|          |                       |          | yet live.                      |                          |
| 58       | Text                  |   C      | May contain optional           | 58=Account not found.    |
|          |                       |          | text information related       | Tag 1                    |
|          |                       |          | to order status. E.g.          |                          |
|          |                       |          | textual explanation of         |                          |
|          |                       |          | rejection                      |                          |
| 59       | TimeInForce           |   Y      | Control order lifetime         | 59=0                     |
|          |                       |          | behavior.                      |                          |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * Day(0)                       |                          |
|          |                       |          | * Good till Cancel(1)          |                          |
|          |                       |          | * Immediate or Cancel(3)       |                          |
|          |                       |          | * Fill Or Kill(4)              |                          |
| 60       | TransactionTime       |   Y      | Timestamp in UTC               | 60=20180912-12:05:       |
|          |                       |          | timezone when the              | 15.105                   |
|          |                       |          | order was created,             |                          |
|          |                       |          | including milliseconds         |                          |
| 100      | ExDestination         |   Y      | ECN or Venue name              | 100=OKEX                 |
|          |                       |          | where the order was sent       |                          |
|          |                       |          | /executed                      |                          |
| 103      | OrdRejReason          |   C      | If a case of a rejection,      | 103=11                   |
|          |                       |          | will help                      |                          |
|          |                       |          | identify the source of         |                          |
|          |                       |          | error                          |                          |
| 167      | SecurityType          |   Y      | Type of security.              | 167=FOR                  |
|          |                       |          | Supported values:              |                          |
|          |                       |          | FOR - Foreign Exchange         |                          |
|          |                       |          | Contract                       |                          |

##OrderMassStatusRequest

This message is used when counterparty needs to obtain a list of list(working) orders that match certain criteria. 

A response will be provided through a series of ExecutionReports that contains ExecType=Status and echoed back MassStatusReqId(584) field. 

|  Tag     | Field Name            | Required | Comments                       | Example                  |
|:---------|:--------------------- |:--------:| :------------------------------|:-------------------------|
| 584      | MassStatusReqId       |   Y      | Unique ID, associated with a   | 584=request_123          |
|          |                       |          | given request                  |                          |
| 585      | MassStatusReqType     |   Y      | Specify the scope of a mass    | 585=1                    |
|          |                       |          | status request.                |                          |
|          |                       |          | Supported Values:              |                          |
|          |                       |          | * status of all orders(7)      |                          |
|          |                       |          | * status of all orders for     |                          |
|          |                       |          | trading Login( 9)              |                          |
| 1        | Account               |   N      | Optional field, that required  | 1=1001                   |
|          |                       |          | when queries for all orders    |                          |
|          |                       |          | for certain trading Login      |                          |
