import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IAllocationReportAckNoAllocs } from './set/allocation_report_ack_no_allocs'
import { IStandardTrailer } from './set/standard_trailer'

export interface IAllocationReportAck {
  StandardHeader: IStandardHeader
  AllocReportID: string// 755
  AllocID: string// 70
  Parties?: IParties
  SecondaryAllocID?: string// 793
  TradeDate?: Date// 75
  TransactTime: Date// 60
  AllocStatus: number// 87
  AllocRejCode?: number// 88
  AllocReportType?: number// 794
  AllocIntermedReqType?: number// 808
  MatchStatus?: string// 573
  Product?: number// 460
  SecurityType?: string// 167
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  NoAllocs?: IAllocationReportAckNoAllocs[]
  StandardTrailer: IStandardTrailer
}
