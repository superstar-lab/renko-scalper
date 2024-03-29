# FIX API Specification - Market Data
  
* [Workflow](#workflow)  
* [Messages Structure](#markdown-header-messages-structure)  
	* [Header](#markdown-header-header)
	* [Footer](#markdown-header-footer)
* [Messages](#markdown-header-messages)  
	* [Logon](#markdown-header-logon)
	* [Logout](#markdown-header-logout)
	* [SecurityListRequest](#markdown-header-securitylistrequest)
	* [SecurityList](#markdown-header-securitylist)
	* [MarketDataRequest](#markdown-header-marketdatarequest)  
	* [MarketDataRequestReject](#markdown-header-marketdatarequestreject)
	* [MarketDataSnapshotFullRefresh](#markdown-header-marketdatasnapshotfullrefresh)
	* [MarketDataIncrementalRefresh](#markdown-header-marketdataincrementalrefresh)
	
***
[return on start page](https://bitbucket.org/xtrd/xtrd_demos/src/master/)
***
# Workflow
![Alt text](https://bitbucket.org/xtrd/xtrd_demos/raw/a233b52f193443871de90bc6ca63b965f458f40a/md_reader/src/repo/1.png)

# Messages Structure

The Feed server is using a slightly modified FIX 4.4. specification(see MarketDataIncrementalRefresh).  

# Header

|  Tag     | Field Name            | Required | Comments                       | Example           |
|:---------|:--------------------- |:--------:| :------------------------------|:------------------|
| 8        | BeginString           |   Y      | Identifies the beginning       |8=FIX4.4           |
|          |                       |          | of the message and             |                   |
|          |                       |          | represents the                 |                   |
|          |                       |          | Transmission                   |                   |
|          |                       |          | Protocol version.              |                   |
|          |                       |          | Supported Value:               |                   |
|          |                       |          | * FIX4.4                       |                   |
|          |                       |          |                                |                   |
| 9        | BodyLength            |   Y      | Message length (number         |9=502              |
|          |                       |          | of bytes) forward to the       |                   |
|          |                       |          | CheckSum tag.                  |                   |
| 35       | MsType                |   Y      | Defines message type e.        |35=A               |
|          |                       |          | g. Logon(A)                    |                   |
| 49       | SenderCompID          |   Y      | Assigned value used to         |49=COMPANY_NAME    |
|          |                       |          | identify sender of a           |                   |
|          |                       |          | message                        |                   |
| 56       | TargetCompID          |   Y      | Assigned value used to         |56=XTR-MD-1        |
|          |                       |          | identify receiving firm        |                   |
|          |                       |          |                                |                   |
|          |                       |          | Supported Values:              |                   |
|          |                       |          |                                |                   |
|          |                       |          | * XTRD-MD-1                    |                   |
| 34       | TargetCompID          |   Y      | Integer message                |34=1000123         |
|          |                       |          | sequence number                |                   |
| 52       | TargetCompID          |   Y      | Time of message                |52=2018-08-02T03:30|
|          |                       |          | transmission (always           |30.658             |
|          |                       |          | expressed in UTC               |                   |
|          |                       |          | (Universal Time                |                   |
|          |                       |          | Coordinated, also known        |                   |
|          |                       |          | as "GMT")                      |                   |

# Footer
|  Tag     | Field Name            | Required | Comments                       | Example           |
|:---------|:--------------------- |:--------:| :------------------------------|:------------------|
| 10       | CheckSum              |   Y      | Three bytes, simple checksum   |10=250             |

[top of page](#markdown-header-fix-api-specification-market-data)


***


# Messages

## Logon

**MsgType**: A

**Direction**: IN/OUT

**Description: Logon** should be sent as a very first message to establish FIX session and pass authentication process. In the   
case of successful authentication, server will respond with corresponding **Logon** message.  

|  Tag     | Field Name            | Required | Comments                       | Example           |
|:---------|:--------------------- |:--------:| :------------------------------|:------------------|
| 98       | EncryptMethod         |   Y      | Supported Values:              |98=0               |
|          |                       |          | 0 - None                       |                   |
| 108      | HeartBtInt            |   Y      |                                |108=5              |
| 141      | ResetSeqNumFlag       |   N      | Indicates both sides of a      |141=Y              |
|          |                       |          | FIX session should reset       |                   |
|          |                       |          | sequence numbers               |                   |
| 553      | Username              |   Y      | Session Username               |553=account_1      |
|          |                       |          | Required for Outgoing          |                   |
|          |                       |          | message                        |                   |
| 554      | Password              |   Y      | Session Password               |554=StR0nG_P       |
|          |                       |          | Required for Outgoing          |                   |
|          |                       |          | message                        |                   |

[top of page](#markdown-header-fix-api-specification-market-data)


***



## Logout

**MsgType**: 5

**Direction**: IN/OUT

**Description**: Logout message is used as a confirmation    

|  Tag     | Field Name            | Required | Comments                       | Example             |
|:---------|:--------------------- |:--------:| :------------------------------|:--------------------|
| 58       | Text                  |   N      | Disconnection reason in        |58=Incorrect Username|
|          |                       |          | human-readable format          |or Password          |
|          |                       |          | Please note, that this         |                     |
|          |                       |          | field might be absent          |                     |


## SecurityListRequest

**MsgType**: x

**Direction**: OUT

**Description**: this message is used to receive a list of all tradable instruments on a particular exchange. 

|  Tag     | Field Name             | Required | Comments                                           | Example      |
|:---------|:---------------------  |:--------:| :--------------------------------------------------|:-------------|
| 320      | SecurityReqID          |    Y     |   Unique request ID                                |320=REQ_1     |
|  559     | SecurityListRequestType|    Y     | Type of request being performed by a               |              |
|          |                        |          | counterpart.                                       |or Password   |
|          |                        |          | Supported values:                                  |              |
|   207    |SecurityExchange        |    Y     |Exchange name to extract a list of all instruments  |  207=HUOBI   |
|          |                        |          |                                                    |              |


[top of page](#markdown-header-fix-api-specification-market-data)


***


## SecurityList

**MsgType**: y

**Direction**: IN

**Description**: this message is used to receive a list of all tradable instruments on a particular exchange. 

|  Tag |    | Field Name           | Required | Comments                                                                                              | Example       |
|:-----|:---|:---------------------|:--------:| :-----------------------------------------------------------------------------------------------------|:--------------|
| 320  |    | SecurityReqID        | Y        | ID from the initiating SecurityListRequest                                                            | 320=REQ_1     |
| 322  |    | SecurityResponseID   | Y        |                                                                                                       |               |
| 560  |    | SecurityRequestResult| Y        | Supported Values:                                                                                     | 560=0         |
|      |    |                      |          | 0 - Valid request                                                                                     |               |
|      |    |                      |          | 1 - Invalid or unsupported request                                                                    |               |
|      |    |                      |          | 2 - No instruments found those match selection criteria                                               |               |
|      |    |                      |          | 3 - Not authorized to retrieve instruments data                                                       |               |
| 393  |    | TotNoRelatedSym      | N        | This field contains information about a number of instruments that matched initial search criteria.   | 393=51        |
| 893  |    | LastFragment         | N        | Boolean field that indicates is given message is last in particular transmission or not               | 893=false     |
| 146  |    | NoRelatedSym         | C        | In case of successful request - always 1                                                              | 146=1         |
| => | 55   | Symbol               | C        |                                                                                                       | 55=ETH/BTC    |
| => | 207  | SecurityExchange     | C        |                                                                                                       | 207=HUOBI     |
| => | 5001 | Price Precision      | C        | Integer value that represents a number of decimal points in prices for given Symbol/Exchange          | 5001=8        |
| => | 5002 | Size Precision       | C        | Integer value that represents a number of deciman points in size for given Symbol/Exchange            | 5002=4        |

 ***
[top of page](#markdown-header-fix-api-specification-market-data)
 ***


## MarketDataRequest

**MsgType**: V

**Direction**: OUT

**Description**: given command used to initiate subscription on real-time market data for symbol(s) on the particular exchange   
(s). In case of successful request, the server will respond with a book's snapshot followed by incremental updates for this  
book.    
    

Server provides flexibility to choose between a quantity of information being transmitted by configuring *MarketDepth*. Caller   
might choose to receive a full book(sometimes a way big) by specifying setting zero to tag 264 or use a custom quantity such  
as 5(5 BIDSs and 5 ASKs).  
  
**MDEntryTypes** should always contain two types - BID(0) and OFFER(1).  
  
Caller might subscribe on several instruments from several exchanges using single **MarketDataRequest** message. 

***Please note, that subscription request will be processed using "all or nothing" principles. 
    This means that for complex requests that contain at least one error in subscription, the whole message will be rejected.***


|  Tag     | Field Name            | Required | Comments                                             | Example             |
|:---------|:--------------------- |:--------:| :----------------------------------------------------|:--------------------|
| 262      | MDReqID               |   Y      | Unique ID                                            |262=1001_1           |
| 263      | SubscriptionRequest   |   Y      | Supported Values:                                     |263=1                |
|          | Type                  |          |* 1 - Snapshot plus   Updates                         |                     |
|          |                       |          |* 2 - disable    previous                             |                     |
|          |                       |          |  Snapshot plus Updates request                       |                     |
|          |                       |          |                                                      |                     |
|          |                       |          |                                                      |                     |
| 264      | MarketDepth           |   Y      |The field used to                                     |264=0                |
|          |                       |          |specify the number                                    |                     |
|          |                       |          |of bids/asks to  receive.                             |                     |
|          |                       |          |                                                      |                     |
|          |                       |          |Supported Values:                                     |                     |
|          |                       |          |0 - Full book                                         |                     |
|          |                       |          |1 - Top of the Book  (best bid/ask)                   |                     |
|          |                       |          |                                                      |                     |
|          |                       |          | N - up to N levels   (where N is a positive integer) |                     |
|          |                       |          |                                                      |                     |
| 265      | MDUpdateType          |   Y      |       Supported values:                              |                     |
|          |                       |          |  1 - Incremental updates                             |     265=1           |
|          |                       |          |                                                      |                     |
| 267      | NoMDEntryTypes        |   Y      | You can choose one or several values                 |                     |
| =>   269 | MDEntryType           |   Y      | Supported Values:                                    |                     |
|          |                       |          |            0 - BID                                   |                     |
|          |                       |          |            1 - OFFER                                 |                     |
|          |                       |          |            2 - TRADE                                 |                     |
|          |                       |          |                                                      |                     |
|          |                       |          | 0 - BID                                              |                     |
|          |                       |          | 1 - OFFER                                            |                     |
| 146      | NoRelatedSym          |   Y      | It is possible to subscribe to several symbols using |                     |
|          |                       |          | a single MarketDataRequest message                   |                     |
|          |                       |          |                                                      |                     |
| =>    55 | Symbol                |   Y      | Symbol name                    |55=ETH/BTC           |                     |
| =>   207 | SecurityExchange      |   Y      | Name of the exchange to receive market data          |   207=HUOBI         |
|          |                       |          |                                                      |                     |

[top of page](#markdown-header-fix-api-specification-market-data)


***



# MarketDataRequestReject

**MsgType**: Y

**Direction**: IN
  
**Description**: in case of logically incorrect **MarketDataRequest** message, subscription for the particular symbol will be rejected   
and server will provide additional information about the cause.  
  
If initial **MarketDataRequest** messages contained several instruments that caused errors, then server will respond with   
several **MarketDataRequestReject** messages under the same *MDReqID*.  

|  Tag     | Field Name            | Required | Comments                       | Example             |
|:---------|:--------------------- |:--------:| :------------------------------|:--------------------|
| 262      | MDReqID               |   Y      | Unique MDReqID                 |262=100_112          |
|          |                       |          | provided in                    |                     |
|          |                       |          | MarketDataRequest              |                     |
|          |                       |          | message that has been          |                     |
|          |                       |          | failed.                        |                     |
| 281      | MDReqRejReason        |   Y      |                                |281=0                |
|          |                       |          |* 0 - Unknown symbol            |                     |
|          |                       |          |* 1 - Duplicated                |                     |
|          |                       |          |MDReqID                         |                     |
|          |                       |          |* 3 - Insufficient              |                     |
|          |                       |          |                                |                     |
| 58       | Text                  |   Y      |Error description in a          |58=ABC/TEST          |
|          |                       |          |human-readable format           |                     |


[top of page](#markdown-header-fix-api-specification-market-data)


***


# MarketDataSnapshotFullRefresh

**MsgType**: W

**Direction**: IN

**Description**: this message contains book snapshot for the particular instrument. A number of levels could be controlled by *MarketDepth*   
parameter submitted as part of **MarketDataRequest** message.

|  Tag|     | Field Name            | Required | Comments                       | Example             |
|:----|-----|:--------------------- |:--------:| :------------------------------|:--------------------|
| 262 |     | MDReqID               |   Y      | MDReqID                        |262=100_1            |
|     |     |                       |          | associated with the            |                     |
|     |     |                       |          | previous request               |                     |
| 55  |     | Symbol                |   Y      | Symbol name                    |55=ETH/BTC           |
| 207 |     | SecurityExchange      |   Y      | Exchange name                  |207=HUOBI            |
| 268 |     | NoMDEntries           |   Y      |                                |                     |
| =>|269    | MDEntryType           |   Y      | Supported Values:              |                     |
|    |      |                       |          | * 0 - BID                      |                     |
|    |      |                       |          | * 1 - OFFER                    |                     |
| =>|270    | MDEntryPx             |   Y      | Price                          |270=0.035089         |
| =>|271    | MDEntrySize           |   Y      | Entry size                     |271=3.014            |
| =>|272    | MDEntryDate           |   Y      | Date when the                  |272=20180601         |
|    |      |                       |          | given entry has                |                     |
|    |      |                       |          | been added or                  |                     |
|    |      |                       |          | modified last time             |                     |
|    |      |                       |          | ISO 8601 format is             |                     |
|    |      |                       |          | used, UTC timezone             |                     |
| =>|273    | MDEntryTime           |   Y      | Time when the                  |273=03:30:           |
|    |      |                       |          | given entry has                |30.657145            |
|    |      |                       |          | been added or                  |                     |
|    |      |                       |          | modified, UTC                  |                     |
|    |      |                       |          | timezone                       |                     |

[top of page](#markdown-header-fix-api-specification-market-data)


***

# MarketDataIncrementalRefresh

**MsgType**: X

**Direction**: IN

**Description**: given message is used to transmit sequential updates for the particular order book. It might contain any number   
of NEW, UPDATE, and DELETE events that reflect the most recent book's changes.

Valid processing order: DELETE → UPDATE → NEW.
  
Server always stream explicit DELETE events.

Please note, that standard FIX 4.4 **MarketDataIncrementalRefresh** message has been changed by moving *Symbol*(55) and   
*SecurityExchange*(207) fields out of *NoMDEntires*(268) group.

|  Tag|     | Field Name            | Required | Comments                       | Example             |
|:----|:------|:--------------------- |:--------:| :------------------------------|:--------------------|
| 262 |       | MDReqID               |   Y      | MDReqID                        |262=100_1            |
|     |       |                       |          | associated with the            |                     |
|     |       |                       |          | previous request               |                     |
| 55  |       | Symbol                |   Y      | Symbol name                    |55=ETH/BTC           |
| 207 |       | SecurityExchange      |   Y      | Exchange name                  |207=HUOBI            |
| 268 |       | NoMDEntries           |   Y      |                                |                     |
|     | =>279 | MDUpdateAction        |   Y      | Supported Values:              |279=1                |
|     |       |                       |          | * 0 - NEW                      |                     |
|     |       |                       |          | * 1 - CHANGE                   |                     |
|     |       |                       |          | * 2 - DELETE                   |                     |
|     | =>269 | MDEntryType           |   Y      | Supported Values:              |269=0                |
|     |       |                       |          | * 0 - BID                      |                     |
|     |       |                       |          | * 1 - OFFER                    |                     |
|     | =>270 | MDEntryPx             |   Y      | Price                          |270=0.035089         |
|     | =>271 | MDEntrySize           |   N      | Entry size. This               |271=3.214            |
|     |       |                       |          | field might be                 |                     |
|     |       |                       |          | absent in case of              |                     |
|     |       |                       |          | DELETE event                   |                     |
|     | =>272 | MDEntryDate           |   Y      | Date when the                  |272=20180601         |
|     |       |                       |          | given entry has                |                     |
|     |       |                       |          | been added or                  |                     |
|     |       |                       |          | modified last time             |                     |
|     |       |                       |          | ISO 8601 format is             |                     |
|     |       |                       |          | used, UTC timezone             |                     |
|     | =>273 | MDEntryTime           |   Y      | Time when the                  |273=03:30:           |
|     |       |                       |          | given entry has                |32.506124            |
|     |       |                       |          | been added or                  |                     |
|     |       |                       |          | modified, UTC                  |                     |
|     |       |                       |          | timezone                       |                     |



[top of page](#markdown-header-fix-api-specification-market-data)

[return on start page](https://bitbucket.org/xtrd/xtrd_demos/src/master/)