import { IStandardHeader } from './set/standard_header'
import { IMarketDataRequestNoMDEntryTypes } from './set/market_data_request_no_md_entry_types'
import { IMarketDataRequestNoRelatedSym } from './set/market_data_request_no_related_sym'
import { IMarketDataRequestNoTradingSessions } from './set/market_data_request_no_trading_sessions'
import { IStandardTrailer } from './set/standard_trailer'

export interface IMarketDataRequest {
  StandardHeader: IStandardHeader
  MDReqID: string// 262
  SubscriptionRequestType: string// 263
  MarketDepth: number// 264
  MDUpdateType?: number// 265
  AggregatedBook?: boolean// 266
  OpenCloseSettlFlag?: string// 286
  Scope?: string// 546
  MDImplicitDelete?: boolean// 547
  NoMDEntryTypes: IMarketDataRequestNoMDEntryTypes[]
  NoRelatedSym: IMarketDataRequestNoRelatedSym[]
  NoTradingSessions?: IMarketDataRequestNoTradingSessions[]
  ApplQueueAction?: number// 815
  ApplQueueMax?: number// 812
  StandardTrailer: IStandardTrailer
}
