import { IStandardHeader } from './set/standard_header'
import { IEmailNoRoutingIDs } from './set/email_no_routing_i_ds'
import { IEmailNoRelatedSym } from './set/email_no_related_sym'
import { IEmailNoUnderlyings } from './set/email_no_underlyings'
import { IEmailNoLegs } from './set/email_no_legs'
import { IEmailLinesOfText } from './set/email_lines_of_text'
import { IStandardTrailer } from './set/standard_trailer'

export interface IEmail {
  StandardHeader: IStandardHeader
  EmailThreadID: string// 164
  EmailType: string// 94
  OrigTime?: Date// 42
  Subject: string// 147
  EncodedSubjectLen?: number// 356
  EncodedSubject?: Buffer// 357
  NoRoutingIDs?: IEmailNoRoutingIDs[]
  NoRelatedSym?: IEmailNoRelatedSym[]
  NoUnderlyings?: IEmailNoUnderlyings[]
  NoLegs?: IEmailNoLegs[]
  OrderID?: string// 37
  ClOrdID?: string// 11
  LinesOfText: IEmailLinesOfText[]
  RawDataLength?: number// 95
  RawData?: Buffer// 96
  StandardTrailer: IStandardTrailer
}
