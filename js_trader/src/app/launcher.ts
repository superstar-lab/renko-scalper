import * as path from 'path'
import { JsFixWinstonLogFactory, WinstonLogger, IJsFixConfig, IJsFixLogger, SessionMsgFactory, makeConfig } from 'jspurefix'

const logFactory = new JsFixWinstonLogFactory(WinstonLogger.consoleOptions('info'))

export abstract class Launcher {
  private readonly logger: IJsFixLogger
  protected constructor (public readonly initiatorConfig: string) {
    this.logger = logFactory.logger('launcher')
  }

  protected abstract getInitiator (config: IJsFixConfig): Promise<any>

  public run () {
    return new Promise<any>((accept, reject) => {
      const logger = this.logger
      logger.info('launching ..')
      this.setup().then(() => {
        logger.info('.. done')
        accept(null)
      }).catch((e: Error) => {
        logger.error(e)
        reject(e)
      })
    })
  }

  private async setup () {
    const root = __dirname
    const init = path.join(root, this.initiatorConfig)
    this.logger.info(`init = ${init}`)
    const clientDescription = require(path.join(root, this.initiatorConfig))
    this.logger.info('launching ..')
    const clientConfig = await
    makeConfig(clientDescription, logFactory, new SessionMsgFactory(clientDescription))
    this.logger.info('create initiator')
    const client = this.getInitiator(clientConfig)
    this.logger.info('launching ....')
    return Promise.all([client])
  }
}
