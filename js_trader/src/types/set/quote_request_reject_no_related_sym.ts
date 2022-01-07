import { IInstrument } from './instrument'
import { IFinancingDetails } from './financing_details'
import { IQuoteRequestRejectNoRelatedSymNoUnderlyings } from './quote_request_reject_no_related_sym_no_underlyings'
import { IOrderQtyData } from './order_qty_data'
import { IStipulations } from './stipulations'
import { IQuoteRequestRejectNoRelatedSymNoLegs } from './quote_request_reject_no_related_sym_no_legs'

export interface IQuoteRequestRejectNoRelatedSym {
  Instrument: IInstrument
  FinancingDetails: IFinancingDetails
  NoUnderlyings?: IQuoteRequestRejectNoRelatedSymNoUnderlyings[]
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
  NoLegs?: IQuoteRequestRejectNoRelatedSymNoLegs[]
}
