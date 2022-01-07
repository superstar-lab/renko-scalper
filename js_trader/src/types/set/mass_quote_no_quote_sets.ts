import { IUnderlyingInstrument } from './underlying_instrument'
import { IMassQuoteNoQuoteSetsNoQuoteEntries } from './mass_quote_no_quote_sets_no_quote_entries'

export interface IMassQuoteNoQuoteSets {
  QuoteSetID: string// 302
  UnderlyingInstrument: IUnderlyingInstrument
  QuoteSetValidUntilTime?: Date// 367
  TotNoQuoteEntries: number// 304
  LastFragment?: boolean// 893
  NoQuoteEntries: IMassQuoteNoQuoteSetsNoQuoteEntries[]
}
