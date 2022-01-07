import { IInstrument } from './instrument'
import { IRFQRequestNoRelatedSymNoUnderlyings } from './rfq_request_no_related_sym_no_underlyings'
import { IRFQRequestNoRelatedSymNoLegs } from './rfq_request_no_related_sym_no_legs'

export interface IRFQRequestNoRelatedSym {
  Instrument: IInstrument
  NoUnderlyings?: IRFQRequestNoRelatedSymNoUnderlyings[]
  NoLegs?: IRFQRequestNoRelatedSymNoLegs[]
  PrevClosePx?: number// 140
  QuoteRequestType?: number// 303
  QuoteType?: number// 537
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
}
