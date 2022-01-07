import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IMassQuoteAcknowledgementNoQuoteSets } from './set/mass_quote_acknowledgement_no_quote_sets'
import { IStandardTrailer } from './set/standard_trailer'

export interface IMassQuoteAcknowledgement {
  StandardHeader: IStandardHeader
  QuoteReqID?: string// 131
  QuoteID?: string// 117
  QuoteStatus: number// 297
  QuoteRejectReason?: number// 300
  QuoteResponseLevel?: number// 301
  QuoteType?: number// 537
  Parties?: IParties
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  NoQuoteSets?: IMassQuoteAcknowledgementNoQuoteSets[]
  StandardTrailer: IStandardTrailer
}
