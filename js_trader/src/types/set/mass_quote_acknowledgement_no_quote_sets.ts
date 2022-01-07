import { IUnderlyingInstrument } from './underlying_instrument'
import { IMassQuoteAcknowledgementNoQuoteSetsNoQuoteEntries } from './mass_quote_acknowledgement_no_quote_sets_no_quote_entries'

export interface IMassQuoteAcknowledgementNoQuoteSets {
  QuoteSetID?: string// 302
  UnderlyingInstrument?: IUnderlyingInstrument
  TotNoQuoteEntries?: number// 304
  LastFragment?: boolean// 893
  NoQuoteEntries?: IMassQuoteAcknowledgementNoQuoteSetsNoQuoteEntries[]
}
