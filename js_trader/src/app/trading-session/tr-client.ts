import EventEmitter = require("events");
import {
  AsciiSession,
  MsgView,
  IJsFixConfig,
  IJsFixLogger,
  MsgType,
} from "jspurefix";
import { MDClient } from "../md-session/md-client";
import { MessageFactory } from "./tr-factory";
import { MessageNormalizer } from "./tr-normalizer";

export class TradingClient extends AsciiSession {

  isReady: EventEmitter;

  private readonly logger: IJsFixLogger;
  private readonly fixLog: IJsFixLogger;

  private messagesNormalizer: MessageNormalizer;
  private messagesFactory: MessageFactory;

  constructor(public readonly config: IJsFixConfig) {
    super(config);
    this.logReceivedMsgs = true;
    this.fixLog = config.logFactory.plain(
      `jsfix.${config!.description!.application!.name}.txt`
    );
    this.logger = config.logFactory.logger(`${this.me}:TradingClient`);
    this.messagesNormalizer = new MessageNormalizer();
    this.messagesFactory = new MessageFactory(1);
    this.isReady = new EventEmitter();
  }

  protected onApplicationMsg(msgType: string, view: MsgView): void {
    let result = this.messagesNormalizer.parse(msgType, view);
    if (result.success) {
      this.logger.info(result.message);
    } else {
      this.logger.error(new Error(result.message));
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
    this.isReady.emit("ready", this)
    this.logger.info("ready");
    const logoutSeconds = 10000;
    this.logger.info(`will logout after ${logoutSeconds}`);
    this.getPositions();
    setTimeout(() => {
      this.done();
    }, logoutSeconds * 1000);
  }

  protected onLogon(view: MsgView, user: string, password: string): boolean {
    return true;
  }

  protected getPositions() {
    let message = this.messagesFactory.positionsMessage();
    this.send(MsgType.RequestForPositions, message);
  }

  protected getOrderMassStatus() {
    let message = this.messagesFactory.orderMassStatusRequestMessage();
    this.send(MsgType.OrderMassStatusRequest, message);
  }

  public sendNewSingleOrder(
    symbol: string,
    size: number,
    price: number,
    exchange: string,
    side: string
  ) {
    let message = this.messagesFactory.newOrderSingleMessage(
      symbol,
      size,
      price,
      exchange,
      side
    );
    this.send(MsgType.NewOrderSingle, message);
  }

  getActiveOrders() {
    return this.messagesNormalizer.activeOrders;
  }

  public sendCancelRequest(orderID: string, clOrderID: string, symbol: string, side: string) {
    let message = this.messagesFactory.cancelOrderMessage(orderID, clOrderID, symbol, side);
    this.send(MsgType.OrderCancelRequest, message);
  }
}
