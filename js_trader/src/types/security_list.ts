import { IStandardHeader } from './set/standard_header'
import { ISecurityListNoRelatedSym } from './set/security_list_no_related_sym'
import { IStandardTrailer } from './set/standard_trailer'

export interface ISecurityList {
  StandardHeader: IStandardHeader
  SecurityReqID: string// 320
  SecurityResponseID: string// 322
  SecurityRequestResult: number// 560
  TotNoRelatedSym?: number// 393
  LastFragment?: boolean// 893
  Text?: string// 58
  NoRelatedSym?: ISecurityListNoRelatedSym[]
  StandardTrailer: IStandardTrailer
}
