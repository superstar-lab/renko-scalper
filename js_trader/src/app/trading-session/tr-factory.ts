import { TimeFormatter } from "jspurefix";
import {
  AccountType,
  IOrderMassStatusRequest,
  IRequestForPositions,
  MassStatusReqType,
  PartyRole,
  PosReqType,
  SubscriptionRequestType,
} from "../../types";
import {
  IInstrument,
  INewOrderSingle,
  IOrderCancelRequest,
  IOrderQtyData,
  OrdType,
  SecurityType,
  TimeInForce,
} from "../../types";

export class MessageFactory {
  constructor(accountID: number) {
    this.requestID = 0;
    this.account = accountID;
  }
  private requestID: number;
  private account: number;
  public newOrderSingleMessage(
    symbol: string,
    size: number,
    price: number,
    exchange: string,
    side: string
  ) {
    this.requestID += 1;
    return {
      Account: this.account.toString(),
      ClOrdID: this.requestID.toString(),
      OrderQtyData: {
        OrderQty: size,
      } as IOrderQtyData,
      OrdType: OrdType.Limit,
      Price: price,
      Side: side,
      Instrument: {
        Symbol: symbol,
        SecurityType: SecurityType.Cryptospot,
      } as IInstrument,
      TimeInForce: TimeInForce.GoodTillCancel,
      TransactTime: new Date(),
      ExDestination: exchange,
    } as INewOrderSingle;
  }

  public cancelOrderMessage(
    order_id: string,
    cl_ord_id: string,
    symbol: string,
    side: string
  ) {
    this.requestID += 1;
    return {
      Account: this.account.toString(),
      ClOrdID: this.requestID.toString(),
      OrderID: order_id,
      OrigClOrdID: cl_ord_id,
      Side: side,
      Instrument: { Symbol: symbol },
      TransactTime: new Date(),
    } as IOrderCancelRequest;
  }

  public positionsMessage() {
    this.requestID += 1;
    return {
      PosReqID: this.requestID.toString(),
      PosReqType: PosReqType.Positions,
      SubscriptionRequestType: SubscriptionRequestType.SnapshotPlusUpdates,
      Account: this.account.toString(),
      AccountType: AccountType.AccountIsCarriedOnCustomerSideOfBooks,
      ClearingBusinessDate: new Date(),
      Parties: {
        NoPartyIDs: [
          {
            PartyID: this.account.toString(),
            PartyRole: PartyRole.OrderOriginationTrader,
          },
        ],
      },
      TransactTime: new Date(),
    } as IRequestForPositions;
  }

  public orderMassStatusRequestMessage() {
    this.requestID += 1;
    return {
      MassStatusReqID: this.requestID.toString(),
      MassStatusReqType: MassStatusReqType.StatusForOrdersForAPartyid,
      Parties: {
        NoPartyIDs: [
          {
            PartyID: this.account.toString(),
            PartyRole: PartyRole.OrderOriginationTrader,
          },
        ],
      },
    } as IOrderMassStatusRequest;
  }
}
