import { IInstrument } from './instrument'
import { IFinancingDetails } from './financing_details'
import { IQuoteRequestNoRelatedSymNoUnderlyings } from './quote_request_no_related_sym_no_underlyings'
import { IOrderQtyData } from './order_qty_data'
import { IStipulations } from './stipulations'
import { IQuoteRequestNoRelatedSymNoLegs } from './quote_request_no_related_sym_no_legs'
import { IQuoteRequestNoRelatedSymNoQuoteQualifiers } from './quote_request_no_related_sym_no_quote_qualifiers'
import { ISpreadOrBenchmarkCurveData } from './spread_or_benchmark_curve_data'
import { IYieldData } from './yield_data'
import { IParties } from './parties'

export interface IQuoteRequestNoRelatedSym {
  Instrument: IInstrument
  FinancingDetails: IFinancingDetails
  NoUnderlyings?: IQuoteRequestNoRelatedSymNoUnderlyings[]
  PrevClosePx?: number// 140
  QuoteRequestType?: number// 303
  QuoteType?: number// 537
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  TradeOriginationDate?: Date// 229
  Side?: string// 54
  QtyType?: number// 854
  OrderQtyData: IOrderQtyData
  SettlType?: string// 63
  SettlDate?: Date// 64
  SettlDate2?: Date// 193
  OrderQty2?: number// 192
  Currency?: string// 15
  Stipulations: IStipulations
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  NoLegs?: IQuoteRequestNoRelatedSymNoLegs[]
  NoQuoteQualifiers?: IQuoteRequestNoRelatedSymNoQuoteQualifiers[]
  QuotePriceType?: number// 692
  OrdType?: string// 40
  ValidUntilTime?: Date// 62
  ExpireTime?: Date// 126
  TransactTime?: Date// 60
  SpreadOrBenchmarkCurveData: ISpreadOrBenchmarkCurveData
  PriceType?: number// 423
  Price?: number// 44
  Price2?: number// 640
  YieldData: IYieldData
  Parties: IParties
}
