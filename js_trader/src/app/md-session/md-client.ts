import {
  AsciiSession,
  MsgView,
  IJsFixConfig,
  IJsFixLogger,
  MsgType,
} from "jspurefix";

import { MessageFactory } from "./md-factory";
import { MessageNormalizer } from "./md-normalizer";
import { MDEntryType } from "../../types";
import EventEmitter = require("events");

export class MDClient extends AsciiSession {
  public topOfTheBook: EventEmitter;

  public isReady: EventEmitter;

  private readonly logger: IJsFixLogger;
  private readonly fixLog: IJsFixLogger;

  private messagesNormalizer: MessageNormalizer;
  private messagesFactory: MessageFactory;

  constructor(public readonly config: IJsFixConfig) {
    super(config);
    this.logReceivedMsgs = false;
    this.fixLog = config.logFactory.plain(
      `jsfix.${config!.description!.application!.name}.txt`
    );
    this.logger = config.logFactory.logger(`${this.me}:MDClient`);
    this.messagesNormalizer = new MessageNormalizer();
    this.messagesFactory = new MessageFactory();
    this.topOfTheBook = new EventEmitter();
    this.isReady = new EventEmitter();
  }

  protected onApplicationMsg(msgType: string, view: MsgView): void {
    switch (msgType) {
      case MsgType.SecurityList: {
        this.messagesNormalizer.parseSecurityListMessage(view);
        break;
      }
      case MsgType.MarketDataSnapshotFullRefresh: {
        let top = this.messagesNormalizer.getTopFromSnapshot(
          view,
          MDEntryType.Offer
        );
        this.topOfTheBook.emit("top", top);
        break;
      }
      case MsgType.MarketDataIncrementalRefresh: {
        this.messagesNormalizer.parseMarketDataIncrementalRefresh(view);
        break;
      }
      case MsgType.MarketDataRequestReject: {
        this.messagesNormalizer.parseMarketDataRequestReject(view);
        break;
      }
    }
  }

  protected onStopped(): void {
    this.logger.info("stopped");
  }

  // use msgType for example to persist only trade capture messages to database
  protected onDecoded(msgType: string, txt: string): void {
    this.fixLog.info(txt);
  }

  // no delimiter substitution on transmit messages
  protected onEncoded(msgType: string, txt: string): void {
    this.fixLog.info(txt);
  }

  protected onReady(view: MsgView): void {
    this.isReady.emit("ready", this);
    this.logger.info("ready");
    const logoutSeconds = 10000;
    this.logger.info(`will logout after ${logoutSeconds}`);

    setTimeout(() => {
      this.done();
    }, logoutSeconds * 1000);
  }

  protected onLogon(view: MsgView, user: string, password: string): boolean {
    return true;
  }

  public sendMDRequest(type: string, symbol: string, exchange: string) {
    let message = this.messagesFactory.marketDataRequestMessage(
      type,
      symbol,
      exchange
    );
    this.send(MsgType.MarketDataRequest, message);
  }
}
