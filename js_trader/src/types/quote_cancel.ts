import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IQuoteCancelNoQuoteEntries } from './set/quote_cancel_no_quote_entries'
import { IStandardTrailer } from './set/standard_trailer'

export interface IQuoteCancel {
  StandardHeader: IStandardHeader
  QuoteReqID?: string// 131
  QuoteID: string// 117
  QuoteCancelType: number// 298
  QuoteResponseLevel?: number// 301
  Parties?: IParties
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  NoQuoteEntries?: IQuoteCancelNoQuoteEntries[]
  StandardTrailer: IStandardTrailer
}
