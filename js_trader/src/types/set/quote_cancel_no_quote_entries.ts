import { IInstrument } from './instrument'
import { IFinancingDetails } from './financing_details'
import { IQuoteCancelNoQuoteEntriesNoUnderlyings } from './quote_cancel_no_quote_entries_no_underlyings'
import { IQuoteCancelNoQuoteEntriesNoLegs } from './quote_cancel_no_quote_entries_no_legs'

export interface IQuoteCancelNoQuoteEntries {
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: IQuoteCancelNoQuoteEntriesNoUnderlyings[]
  NoLegs?: IQuoteCancelNoQuoteEntriesNoLegs[]
}
