import { IStandardHeader } from './set/standard_header'
import { IQuoteResponseNoQuoteQualifiers } from './set/quote_response_no_quote_qualifiers'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { IQuoteResponseNoUnderlyings } from './set/quote_response_no_underlyings'
import { IOrderQtyData } from './set/order_qty_data'
import { IStipulations } from './set/stipulations'
import { IQuoteResponseNoLegs } from './set/quote_response_no_legs'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IYieldData } from './set/yield_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface IQuoteResponse {
  StandardHeader: IStandardHeader
  QuoteRespID: string// 693
  QuoteID?: string// 117
  QuoteRespType: number// 694
  ClOrdID?: string// 11
  OrderCapacity?: string// 528
  IOIID?: string// 23
  QuoteType?: number// 537
  NoQuoteQualifiers?: IQuoteResponseNoQuoteQualifiers[]
  Parties?: IParties
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: IQuoteResponseNoUnderlyings[]
  Side?: string// 54
  OrderQtyData?: IOrderQtyData
  SettlType?: string// 63
  SettlDate?: Date// 64
  SettlDate2?: Date// 193
  OrderQty2?: number// 192
  Currency?: string// 15
  Stipulations?: IStipulations
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  NoLegs?: IQuoteResponseNoLegs[]
  BidPx?: number// 132
  OfferPx?: number// 133
  MktBidPx?: number// 645
  MktOfferPx?: number// 646
  MinBidSize?: number// 647
  BidSize?: number// 134
  MinOfferSize?: number// 648
  OfferSize?: number// 135
  ValidUntilTime?: Date// 62
  BidSpotRate?: number// 188
  OfferSpotRate?: number// 190
  BidForwardPoints?: number// 189
  OfferForwardPoints?: number// 191
  MidPx?: number// 631
  BidYield?: number// 632
  MidYield?: number// 633
  OfferYield?: number// 634
  TransactTime?: Date// 60
  OrdType?: string// 40
  BidForwardPoints2?: number// 642
  OfferForwardPoints2?: number// 643
  SettlCurrBidFxRate?: number// 656
  SettlCurrOfferFxRate?: number// 657
  SettlCurrFxRateCalc?: string// 156
  Commission?: number// 12
  CommType?: string// 13
  CustOrderCapacity?: number// 582
  ExDestination?: string// 100
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  Price?: number// 44
  PriceType?: number// 423
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  YieldData?: IYieldData
  StandardTrailer: IStandardTrailer
}
