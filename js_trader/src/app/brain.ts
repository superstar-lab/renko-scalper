import { MsgView } from "jspurefix";
import { MsgTag } from "../types/enum/msg_tag";
import {
  IExecutionReport,
  IMarketDataIncrementalRefreshNoMDEntries,
  MDEntryType,
  Side,
} from "../types";
import { MDClient } from "./md-session/md-client";
import { TradingClient } from "./trading-session/tr-client";

export class Brain {
  private _mdSession: MDClient;
  private _tradingSession: TradingClient;

  constructor() {}

  set tradingSession(session: TradingClient) {
    this._tradingSession = session;
    if (this._mdSession) this.init();
  }

  set mdSession(session: MDClient) {
    this._mdSession = session;
    if (this._tradingSession) this.init();
  }

  init() {
    if (this._mdSession && this._tradingSession) {
      console.log("Both clients are working");
    }
    this._mdSession.sendMDRequest(MDEntryType.Bid, "BTC/USDT", "BINANCE");
    this._mdSession.topOfTheBook.on(
      "top",
      (top: IMarketDataIncrementalRefreshNoMDEntries) => {
        this.trade(top, "BTC/USDT", "BINANCE");
      }
    );
  }

  cancelOrder(
    orderID: string,
    clOrderID: string,
    symbol: string,
    side: string
  ) {
    this._tradingSession.sendCancelRequest(orderID, clOrderID, symbol, side);
  }

  trade(
    top: IMarketDataIncrementalRefreshNoMDEntries,
    symbol: string,
    exchange: string,
  ) {
    setInterval(() => {
      this._tradingSession.sendNewSingleOrder(
        symbol,
        0.01,
        top.MDEntryPx * 1.2,
        exchange,
        Side.Sell
      );
      setTimeout(() => {
        let orders = this._tradingSession.getActiveOrders();
        let xtrdOrderID = Object.keys(orders)[0];
        let lastExecutionReport = orders[xtrdOrderID][
          orders[xtrdOrderID].length - 1
        ] as IExecutionReport;
        let clOrderID = lastExecutionReport.ClOrdID;
        let orderSymbol = lastExecutionReport.Instrument.Symbol;
        let orderSide = lastExecutionReport.Side;
        this.cancelOrder(xtrdOrderID, clOrderID, orderSymbol, orderSide);
      }, 3000);
    }, 4000);
  }
}
