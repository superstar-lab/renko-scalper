import { IStandardHeader } from './set/standard_header'
import { INetworkStatusResponseNoCompIDs } from './set/network_status_response_no_comp_i_ds'
import { IStandardTrailer } from './set/standard_trailer'

export interface INetworkStatusResponse {
  StandardHeader: IStandardHeader
  NetworkStatusResponseType: number// 937
  NetworkRequestID?: string// 933
  NetworkResponseID?: string// 932
  LastNetworkResponseID?: string// 934
  NoCompIDs: INetworkStatusResponseNoCompIDs[]
  StandardTrailer: IStandardTrailer
}
