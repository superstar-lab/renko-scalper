import { IInstrument } from './instrument'
import { IInstrumentExtension } from './instrument_extension'
import { IDerivativeSecurityListNoRelatedSymNoLegs } from './derivative_security_list_no_related_sym_no_legs'

export interface IDerivativeSecurityListNoRelatedSym {
  Instrument?: IInstrument
  Currency?: string// 15
  ExpirationCycle?: number// 827
  InstrumentExtension?: IInstrumentExtension
  NoLegs?: IDerivativeSecurityListNoRelatedSymNoLegs[]
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
}
