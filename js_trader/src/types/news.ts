import { IStandardHeader } from './set/standard_header'
import { INewsNoRoutingIDs } from './set/news_no_routing_i_ds'
import { INewsNoRelatedSym } from './set/news_no_related_sym'
import { INewsNoLegs } from './set/news_no_legs'
import { INewsNoUnderlyings } from './set/news_no_underlyings'
import { INewsLinesOfText } from './set/news_lines_of_text'
import { IStandardTrailer } from './set/standard_trailer'

export interface INews {
  StandardHeader: IStandardHeader
  OrigTime?: Date// 42
  Urgency?: string// 61
  Headline: string// 148
  EncodedHeadlineLen?: number// 358
  EncodedHeadline?: Buffer// 359
  NoRoutingIDs?: INewsNoRoutingIDs[]
  NoRelatedSym?: INewsNoRelatedSym[]
  NoLegs?: INewsNoLegs[]
  NoUnderlyings?: INewsNoUnderlyings[]
  LinesOfText: INewsLinesOfText[]
  URLLink?: string// 149
  RawDataLength?: number// 95
  RawData?: Buffer// 96
  StandardTrailer: IStandardTrailer
}
