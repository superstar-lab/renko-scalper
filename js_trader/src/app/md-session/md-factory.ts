import {
  ISecurityListRequest,
  SecurityListRequestType,
  IMarketDataRequest,
  SubscriptionRequestType,
  MDUpdateType,
} from "../../types";

export class MessageFactory {
  public securityListRequestMessage(exchange: string) {
    const requestID = (Math.random() * 100000000).toFixed(0);
    return {
      SecurityReqID: requestID,
      SecurityListRequestType: SecurityListRequestType.AllSecurities,
      Instrument: {
        SecurityExchange: exchange,
      },
    } as ISecurityListRequest;
  }

  public marketDataRequestMessage(
    entryType: string,
    symbol_name: string,
    security_exchange: string
  ) {
    const requestID = (Math.random() * 100000000).toFixed(0);
    return {
      MDReqID: requestID,
      SubscriptionRequestType: SubscriptionRequestType.SnapshotPlusUpdates,
      MarketDepth: 0,
      MDUpdateType: MDUpdateType.IncrementalRefresh,
      NoMDEntryTypes: [
        {
          MDEntryType: entryType,
        },
      ],
      NoRelatedSym: [
        {
          Instrument: {
            Symbol: symbol_name,
            SecurityExchange: security_exchange,
          },
        },
      ],
    } as IMarketDataRequest;
  }
}
