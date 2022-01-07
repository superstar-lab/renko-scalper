import { IInstrument } from './instrument'
import { IInstrumentExtension } from './instrument_extension'
import { IFinancingDetails } from './financing_details'
import { ISecurityListNoRelatedSymNoUnderlyings } from './security_list_no_related_sym_no_underlyings'
import { IStipulations } from './stipulations'
import { ISecurityListNoRelatedSymNoLegs } from './security_list_no_related_sym_no_legs'
import { ISpreadOrBenchmarkCurveData } from './spread_or_benchmark_curve_data'
import { IYieldData } from './yield_data'

export interface ISecurityListNoRelatedSym {
  Instrument?: IInstrument
  InstrumentExtension?: IInstrumentExtension
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: ISecurityListNoRelatedSymNoUnderlyings[]
  Currency?: string// 15
  Stipulations?: IStipulations
  NoLegs?: ISecurityListNoRelatedSymNoLegs[]
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  YieldData?: IYieldData
  RoundLot?: number// 561
  Symbol?: string// 55
  SecurityExchange?: string// 207
  PricePrecision?: number// 5001
  SizePrecision?: number// 5002
  MinTradeVol?: number// 562
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  ExpirationCycle?: number// 827
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
}
