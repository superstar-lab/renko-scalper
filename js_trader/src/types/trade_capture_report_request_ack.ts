import { IStandardHeader } from './set/standard_header'
import { IInstrument } from './set/instrument'
import { ITradeCaptureReportRequestAckNoUnderlyings } from './set/trade_capture_report_request_ack_no_underlyings'
import { ITradeCaptureReportRequestAckNoLegs } from './set/trade_capture_report_request_ack_no_legs'
import { IStandardTrailer } from './set/standard_trailer'

export interface ITradeCaptureReportRequestAck {
  StandardHeader: IStandardHeader
  TradeRequestID: string// 568
  TradeRequestType: number// 569
  SubscriptionRequestType?: string// 263
  TotNumTradeReports?: number// 748
  TradeRequestResult: number// 749
  TradeRequestStatus: number// 750
  Instrument?: IInstrument
  NoUnderlyings?: ITradeCaptureReportRequestAckNoUnderlyings[]
  NoLegs?: ITradeCaptureReportRequestAckNoLegs[]
  MultiLegReportingType?: string// 442
  ResponseTransportType?: number// 725
  ResponseDestination?: string// 726
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
