import { IStandardHeader } from './set/standard_header'
import { IConfirmationRequestNoOrders } from './set/confirmation_request_no_orders'
import { IStandardTrailer } from './set/standard_trailer'

export interface IConfirmationRequest {
  StandardHeader: IStandardHeader
  ConfirmReqID: string// 859
  ConfirmType: number// 773
  NoOrders?: IConfirmationRequestNoOrders[]
  AllocID?: string// 70
  SecondaryAllocID?: string// 793
  IndividualAllocID?: string// 467
  TransactTime: Date// 60
  AllocAccount?: string// 79
  AllocAcctIDSource?: number// 661
  AllocAccountType?: number// 798
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
