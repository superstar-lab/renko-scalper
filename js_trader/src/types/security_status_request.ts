import { IStandardHeader } from './set/standard_header'
import { IInstrument } from './set/instrument'
import { IInstrumentExtension } from './set/instrument_extension'
import { ISecurityStatusRequestNoUnderlyings } from './set/security_status_request_no_underlyings'
import { ISecurityStatusRequestNoLegs } from './set/security_status_request_no_legs'
import { IStandardTrailer } from './set/standard_trailer'

export interface ISecurityStatusRequest {
  StandardHeader: IStandardHeader
  SecurityStatusReqID: string// 324
  Instrument?: IInstrument
  InstrumentExtension?: IInstrumentExtension
  NoUnderlyings?: ISecurityStatusRequestNoUnderlyings[]
  NoLegs?: ISecurityStatusRequestNoLegs[]
  Currency?: string// 15
  SubscriptionRequestType: string// 263
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  StandardTrailer: IStandardTrailer
}
