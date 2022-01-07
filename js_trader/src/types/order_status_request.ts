import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { IOrderStatusRequestNoUnderlyings } from './set/order_status_request_no_underlyings'
import { IStandardTrailer } from './set/standard_trailer'

export interface IOrderStatusRequest {
  StandardHeader: IStandardHeader
  OrderID?: string// 37
  ClOrdID: string// 11
  SecondaryClOrdID?: string// 526
  ClOrdLinkID?: string// 583
  Parties?: IParties
  OrdStatusReqID?: string// 790
  Account?: string// 1
  AcctIDSource?: number// 660
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: IOrderStatusRequestNoUnderlyings[]
  Side: string// 54
  StandardTrailer: IStandardTrailer
}
