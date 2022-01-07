import { IStandardHeader } from './set/standard_header'
import { IInstrument } from './set/instrument'
import { IInstrumentExtension } from './set/instrument_extension'
import { IFinancingDetails } from './set/financing_details'
import { ISecurityListRequestNoUnderlyings } from './set/security_list_request_no_underlyings'
import { ISecurityListRequestNoLegs } from './set/security_list_request_no_legs'
import { IStandardTrailer } from './set/standard_trailer'

export interface ISecurityListRequest{
  StandardHeader: IStandardHeader
  SecurityReqID: string// 320
  SecurityListRequestType: number// 559
  Instrument?: IInstrument
  InstrumentExtension?: IInstrumentExtension
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: ISecurityListRequestNoUnderlyings[]
  NoLegs?: ISecurityListRequestNoLegs[]
  Currency?: string// 15
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  SubscriptionRequestType?: string// 263
  StandardTrailer: IStandardTrailer
}
