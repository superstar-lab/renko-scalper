import { IStandardHeader } from './set/standard_header'
import { ICrossOrderCancelRequestNoSides } from './set/cross_order_cancel_request_no_sides'
import { IInstrument } from './set/instrument'
import { ICrossOrderCancelRequestNoUnderlyings } from './set/cross_order_cancel_request_no_underlyings'
import { ICrossOrderCancelRequestNoLegs } from './set/cross_order_cancel_request_no_legs'
import { IStandardTrailer } from './set/standard_trailer'

export interface ICrossOrderCancelRequest {
  StandardHeader: IStandardHeader
  OrderID?: string// 37
  CrossID: string// 548
  OrigCrossID: string// 551
  CrossType: number// 549
  CrossPrioritization: number// 550
  NoSides: ICrossOrderCancelRequestNoSides[]
  Instrument?: IInstrument
  NoUnderlyings?: ICrossOrderCancelRequestNoUnderlyings[]
  NoLegs?: ICrossOrderCancelRequestNoLegs[]
  TransactTime: Date// 60
  StandardTrailer: IStandardTrailer
}
