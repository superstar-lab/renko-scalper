import { IStandardHeader } from './set/standard_header'
import { IListStatusNoOrders } from './set/list_status_no_orders'
import { IStandardTrailer } from './set/standard_trailer'

export interface IListStatus {
  StandardHeader: IStandardHeader
  ListID: string// 66
  ListStatusType: number// 429
  NoRpts: number// 82
  ListOrderStatus: number// 431
  RptSeq: number// 83
  ListStatusText?: string// 444
  EncodedListStatusTextLen?: number// 445
  EncodedListStatusText?: Buffer// 446
  TransactTime?: Date// 60
  TotNoOrders: number// 68
  LastFragment?: boolean// 893
  NoOrders: IListStatusNoOrders[]
  StandardTrailer: IStandardTrailer
}
