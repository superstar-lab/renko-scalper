import { TradingClient } from "./trading-session/tr-client";
import { IJsFixConfig, initiator } from "jspurefix";
import { Launcher } from "./launcher";
import { MDClient } from "./md-session/md-client";
import { Brain } from "./brain";
import EventEmitter = require("events");

class TradingLauncher extends Launcher {
  public clientInstance: TradingClient;

  public ready: EventEmitter;

  public constructor() {
    super("./../../data/session/trading-initiator.json");
    this.ready = new EventEmitter();
  }

  protected getInitiator(config: IJsFixConfig): Promise<any> {
    return initiator(config, (c) => {
      this.clientInstance = new TradingClient(c);
      this.clientInstance.isReady.on("ready", (client: TradingClient) => {
        this.ready.emit("trading_client", client);
      });
      return this.clientInstance;
    });
  }
}

class MDLauncher extends Launcher {
  public clientInstance: MDClient;

  ready: EventEmitter;

  public constructor() {
    super("./../../data/session/md-initiator.json");
    this.ready = new EventEmitter();
  }

  protected getInitiator(config: IJsFixConfig): Promise<any> {
    return initiator(config, (c) => {
      this.clientInstance = new MDClient(c);
      this.clientInstance.isReady.on("ready", (client: MDClient) => {
        this.ready.emit("md_client", client);
      });
      return this.clientInstance;
    });
  }
}
const mdLauncher = new MDLauncher();
const tradingLauncher = new TradingLauncher();

const brain = new Brain();

mdLauncher
  .run()
  .then(() => {
    console.log("finished.");
  })
  .catch((e) => {
    console.log(e);
  });

tradingLauncher
  .run()
  .then(() => {
    console.log("finished.");
  })
  .catch((e) => {
    console.log(e);
  });

mdLauncher.ready.on("md_client", (client) => {
  brain.mdSession = client;
});

tradingLauncher.ready.on("trading_client", (client) => {
  brain.tradingSession = client;
});
