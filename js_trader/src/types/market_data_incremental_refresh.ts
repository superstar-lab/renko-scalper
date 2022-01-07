import { IStandardHeader } from './set/standard_header'
import { IMarketDataIncrementalRefreshNoMDEntries } from './set/market_data_incremental_refresh_no_md_entries'
import { IStandardTrailer } from './set/standard_trailer'

export interface IMarketDataIncrementalRefresh {
  StandardHeader: IStandardHeader
  MDReqID: string// 262
  Symbol: string// 55
  SecurityExchange: string// 207
  NoMDEntries: IMarketDataIncrementalRefreshNoMDEntries[]
  ApplQueueDepth?: number// 813
  ApplQueueResolution?: number// 814
  StandardTrailer: IStandardTrailer
}
