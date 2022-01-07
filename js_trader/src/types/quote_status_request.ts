import { IStandardHeader } from './set/standard_header'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { IQuoteStatusRequestNoUnderlyings } from './set/quote_status_request_no_underlyings'
import { IQuoteStatusRequestNoLegs } from './set/quote_status_request_no_legs'
import { IParties } from './set/parties'
import { IStandardTrailer } from './set/standard_trailer'

export interface IQuoteStatusRequest {
  StandardHeader: IStandardHeader
  QuoteStatusReqID?: string// 649
  QuoteID?: string// 117
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: IQuoteStatusRequestNoUnderlyings[]
  NoLegs?: IQuoteStatusRequestNoLegs[]
  Parties?: IParties
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  SubscriptionRequestType?: string// 263
  StandardTrailer: IStandardTrailer
}
