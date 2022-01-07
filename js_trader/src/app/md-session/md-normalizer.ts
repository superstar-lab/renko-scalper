import { MsgView } from "jspurefix";
import { IMarketDataSnapshotFullRefreshNoMDEntries } from "../../types";
import { MsgTag } from "../../types/enum/msg_tag";

export class MessageNormalizer {
  constructor() {
    this.available_symbols = [];
  }

  protected available_symbols: any[];

  public parseSecurityListMessage(view: MsgView): void {
    let group: MsgView = view.getView("NoRelatedSym");
    let groupInstance: MsgView = group.getGroupInstance(0);
    let symbol = {
      name: groupInstance.getString(MsgTag.Symbol),
      exchange: groupInstance.getString(MsgTag.SecurityExchange),
    };
    this.available_symbols.push(symbol);
    if (view.getString(MsgTag.LastFragment) === "Y")
      console.log(this.available_symbols);
  }

  public parseMarketDataSnapshotFullRefresh(view: MsgView, type: string): IMarketDataSnapshotFullRefreshNoMDEntries {
    let topOfTheBook: IMarketDataSnapshotFullRefreshNoMDEntries;
    let entryCount: number = view.getTyped(MsgTag.NoMDEntries);
    let groups: MsgView = view.getView("NoMDEntries");
    for(let i= 0; i < entryCount-1; i++) {
      let entry: IMarketDataSnapshotFullRefreshNoMDEntries = groups.getGroupInstance(i).toObject();
      if(entry.MDEntryType === type) {
        if (topOfTheBook) {
          if(topOfTheBook.MDEntryPx > entry.MDEntryPx) topOfTheBook = entry;
        } else {
          topOfTheBook = entry
        }
      }
    }
    console.log(
      "Snapshot was received. Total entry count: " +
        view.getString(MsgTag.NoMDEntries)
    );
    return topOfTheBook;
  }

  public parseMarketDataIncrementalRefresh(view: MsgView): void {
    let symbol = view.getString(MsgTag.Symbol);
    let exchange = view.getString(MsgTag.SecurityExchange);
    let groupInstance: MsgView = view
      .getView("NoMDEntries")
      .getGroupInstance(0);
    let action = groupInstance.getString(MsgTag.MDUpdateAction);
    let price = groupInstance.getString(MsgTag.MDEntryPx);
    console.log(
      `Incremental refresh was received. Symbol: ${symbol}, exchange: ${exchange}, action: ${action}, price: ${price}.`
    );
  }
  public parseMarketDataRequestReject(view: MsgView) {
    let reason: string = view.getString(MsgTag.Text);
    console.log(
      "MarketDataRequest was rejected by counterparty. Reason: " + reason
    );
  }

  public getTopFromSnapshot(view: MsgView, type: string) {
    return this.parseMarketDataSnapshotFullRefresh(view, type);
  }
}
