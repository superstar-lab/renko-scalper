import { IStandardHeader } from './set/standard_header'
import { IMarketDataRequestRejectNoAltMDSource } from './set/market_data_request_reject_no_alt_md_source'
import { IStandardTrailer } from './set/standard_trailer'

export interface IMarketDataRequestReject {
  StandardHeader: IStandardHeader
  MDReqID: string// 262
  MDReqRejReason?: string// 281
  NoAltMDSource?: IMarketDataRequestRejectNoAltMDSource[]
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
