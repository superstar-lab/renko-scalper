import { MsgView } from "jspurefix";
import { IExecutionReport, MsgTag } from "jspurefix/dist/types/FIX4.4/repo";
import {
  CxlRejReason,
  ExecType,
  MsgType,
  PartyRole,
  PosReqResult,
} from "../../types";
import { ExecResult } from "../model/exec-result";

export class MessageNormalizer {
  public activeOrders: any = {};

  constructor() {}

  public parse(msgType: string, view: MsgView): ExecResult {
    switch (msgType) {
      case MsgType.RequestForPositionsAck: {
        return this.parseRequestForPositionsAck(view);
      }
      case MsgType.PositionReport: {
        return this.parsePositionReport(view);
      }
      case MsgType.ExecutionReport: {
        return this.parseExecutionReport(view);
      }
      case MsgType.OrderCancelReject: {
        return this.parseOrderCancelReject(view);
      }
    }
  }

  private parseRequestForPositionsAck(view: MsgView): ExecResult {
    let posReqResult = view.getString(MsgTag.PosReqResult);
    switch (posReqResult) {
      case PosReqResult.InvalidOrUnsupportedRequest.toString(): {
        return new ExecResult(
          false,
          "[XTRD] An error occured while processing RequestForPositionsAck: invalid or unsupported request"
        );
      }
      case PosReqResult.NoPositionsFoundThatMatchCriteria.toString(): {
        return new ExecResult(
          false,
          "[XTRD] An error occured while processing RequestForPositionsAck: no positions"
        );
      }
      case PosReqResult.NotAuthorizedToRequestPositions.toString(): {
        return new ExecResult(
          false,
          "[XTRD] An error occured while processing RequestForPositionsAck: not authorized"
        );
      }
      default: {
        return new ExecResult(
          true,
          "[XTRD] Positions request succeed. Positions found: " +
            view.getString(MsgTag.TotalNumPosReports)
        );
      }
    }
  }
  private parsePositionReport(view: MsgView): ExecResult {
    let asset_name = view.getString(MsgTag.Symbol);
    let exchange;
    let size;
    for (let i = 0; i < +view.getString(MsgTag.NoPartyIDs) - 1; i++) {
      let role = view
        .getView("NoPartyIDs")
        .getGroupInstance(i)
        .getString(MsgTag.PartyRole);
      if (role === PartyRole.Exchange.toString())
        exchange = view
          .getView("NoPartyIDs")
          .getGroupInstance(i)
          .getString(MsgTag.PartyID);
    }
    let posGroup = view.getView("NoPositions").getGroupInstance(0);
    if (posGroup.contains(MsgTag.LongQty))
      size = posGroup.getString(MsgTag.LongQty);
    else size = posGroup.getString(MsgTag.ShortQty);
    let type = view.getString(MsgTag.SecurityType);
    return new ExecResult(
      true,
      `[XTRD] Position found. Currency: ${asset_name}, size: ${size}, type: ${type}.`
    );
  }
  private parseExecutionReport(view: MsgView): ExecResult {
    let clOrderID: string = view.getString(MsgTag.ClOrdID);
    let xtrdOrderID: string = view.getString(MsgTag.OrderID);
    let orderStatus: string = view.getString(MsgTag.OrdStatus);
    let execType: string = view.getString(MsgTag.ExecType);
    if (execType !== ExecType.OrderStatus) {
      let status;
      if (orderStatus !== "8") {
        switch (orderStatus) {
          case "A": {
            status = "PENDING NEW";
            this.saveExecutionReport(xtrdOrderID, view);
            break;
          }
          case "0": {
            status = "NEW";
            this.saveExecutionReport(xtrdOrderID, view);
            break;
          }
          case "1": {
            status = "PARTIALLY FILLED";
            this.saveExecutionReport(xtrdOrderID, view);
            break;
          }
          case "2": {
            status = "FILLED";
            this.removeOrder(xtrdOrderID);
            break;
          }
          case "4": {
            status = "CANCELLED";
            this.removeOrder(xtrdOrderID);
            break;
          }
        }
        return new ExecResult(
          true,
          `[XTRD] Order with ID: ${clOrderID} (${xtrdOrderID}) changed status to ${status}`
        );
      } else {
        let reason = view.getString(MsgTag.Text);
        return new ExecResult(
          false,
          `[XTRD] Order with ID: ${clOrderID} (${xtrdOrderID}) changed status to REJECTED. Reason: ${reason}`
        );
      }
    } else {
      let areOpenOrders = view.contains(MsgTag.Text);
      if (!areOpenOrders) {
        let orderID = view.getString(MsgTag.OrderID);
        let clOrdID = view.getString(MsgTag.ClOrdID);
        return new ExecResult(
          true,
          `[XTRD] You have open order with IDs: ${orderID} (${clOrderID})`
        );
      } else {
        let text = view.getString(MsgTag.Text);
        return new ExecResult(
          false,
          `[XTRD] Unable to get open orders. Reason: ${text}`
        );
      }
    }
  }
  private parseOrderCancelReject(view: MsgView): ExecResult {
    let orderID = view.getString(MsgTag.OrderID);
    let origClOrdID = view.getString(MsgTag.OrigClOrdID);
    let rejReasonCode = view.getString(MsgTag.CxlRejReason);
    let rejReason;
    switch (rejReasonCode) {
      case CxlRejReason.TooLateToCancel.toString(): {
        rejReason = "Too late to cancel";
        break;
      }
      case CxlRejReason.UnknownOrder.toString(): {
        rejReason = "Unknown order";
        break;
      }
      case CxlRejReason.BrokerExchangeOption.toString(): {
        rejReason = "Broken/exchange option";
        break;
      }
      case CxlRejReason.Other.toString(): {
        rejReason = "Other";
        break;
      }
    }
    return new ExecResult(
      false,
      `[XTRD] Unable to cancel order ${orderID} (${origClOrdID}). Reason: (${rejReason})`
    );
  }

  saveExecutionReport(xtrdOrderID: string, view: MsgView) {
    if (!this.activeOrders[xtrdOrderID]) {
      this.activeOrders[xtrdOrderID] = [];
      this.activeOrders[xtrdOrderID].push(view.toObject());
    } else {
      this.activeOrders[xtrdOrderID].push(view.toObject());
    }
  }

  removeOrder(xtrdOrderID: string) {
    delete this.activeOrders[xtrdOrderID];
  }
  
}
