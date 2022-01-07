import { IStandardHeader } from './set/standard_header'
import { IMarketDataSnapshotFullRefreshNoMDEntries } from './set/market_data_snapshot_full_refresh_no_md_entries'
import { IStandardTrailer } from './set/standard_trailer'

export interface IMarketDataSnapshotFullRefresh {
  StandardHeader: IStandardHeader
  MDReqID: string// 262
  Symbol: string// 55
  SecurityExchange: string// 207
  NoMDEntries: IMarketDataSnapshotFullRefreshNoMDEntries[]
  ApplQueueDepth?: number// 813
  ApplQueueResolution?: number// 814
  StandardTrailer: IStandardTrailer
}
