import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IInstrumentExtension } from './set/instrument_extension'
import { IFinancingDetails } from './set/financing_details'
import { ITradeCaptureReportRequestNoUnderlyings } from './set/trade_capture_report_request_no_underlyings'
import { ITradeCaptureReportRequestNoLegs } from './set/trade_capture_report_request_no_legs'
import { ITradeCaptureReportRequestNoDates } from './set/trade_capture_report_request_no_dates'
import { IStandardTrailer } from './set/standard_trailer'

export interface ITradeCaptureReportRequest {
  StandardHeader: IStandardHeader
  TradeRequestID: string// 568
  TradeRequestType: number// 569
  SubscriptionRequestType?: string// 263
  TradeReportID?: string// 571
  SecondaryTradeReportID?: string// 818
  ExecID?: string// 17
  ExecType?: string// 150
  OrderID?: string// 37
  ClOrdID?: string// 11
  MatchStatus?: string// 573
  TrdType?: number// 828
  TrdSubType?: number// 829
  TransferReason?: string// 830
  SecondaryTrdType?: number// 855
  TradeLinkID?: string// 820
  TrdMatchID?: string// 880
  Parties?: IParties
  Instrument?: IInstrument
  InstrumentExtension?: IInstrumentExtension
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: ITradeCaptureReportRequestNoUnderlyings[]
  NoLegs?: ITradeCaptureReportRequestNoLegs[]
  NoDates?: ITradeCaptureReportRequestNoDates[]
  ClearingBusinessDate?: Date// 715
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  TimeBracket?: string// 943
  Side?: string// 54
  MultiLegReportingType?: string// 442
  TradeInputSource?: string// 578
  TradeInputDevice?: string// 579
  ResponseTransportType?: number// 725
  ResponseDestination?: string// 726
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
