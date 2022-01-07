import { IStandardHeader } from './set/standard_header'
import { INetworkStatusRequestNoCompIDs } from './set/network_status_request_no_comp_i_ds'
import { IStandardTrailer } from './set/standard_trailer'

export interface INetworkStatusRequest {
  StandardHeader: IStandardHeader
  NetworkRequestType: number// 935
  NetworkRequestID: string// 933
  NoCompIDs?: INetworkStatusRequestNoCompIDs[]
  StandardTrailer: IStandardTrailer
}
