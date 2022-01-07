import { IStandardHeader } from './set/standard_header'
import { IQuoteRequestRejectNoRelatedSym } from './set/quote_request_reject_no_related_sym'
import { IQuoteRequestRejectNoQuoteQualifiers } from './set/quote_request_reject_no_quote_qualifiers'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IYieldData } from './set/yield_data'
import { IParties } from './set/parties'
import { IStandardTrailer } from './set/standard_trailer'

export interface IQuoteRequestReject {
  StandardHeader: IStandardHeader
  QuoteReqID: string// 131
  RFQReqID?: string// 644
  QuoteRequestRejectReason: number// 658
  NoRelatedSym: IQuoteRequestRejectNoRelatedSym[]
  NoQuoteQualifiers?: IQuoteRequestRejectNoQuoteQualifiers[]
  QuotePriceType?: number// 692
  OrdType?: string// 40
  ExpireTime?: Date// 126
  TransactTime?: Date// 60
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  PriceType?: number// 423
  Price?: number// 44
  Price2?: number// 640
  YieldData?: IYieldData
  Parties?: IParties
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
