import { IStandardHeader } from './set/standard_header'
import { IBidResponseNoBidComponents } from './set/bid_response_no_bid_components'
import { IStandardTrailer } from './set/standard_trailer'

export interface IBidResponse {
  StandardHeader: IStandardHeader
  BidID?: string// 390
  ClientBidID?: string// 391
  NoBidComponents: IBidResponseNoBidComponents[]
  StandardTrailer: IStandardTrailer
}
