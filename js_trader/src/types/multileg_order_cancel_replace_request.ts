import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IMultilegOrderCancelReplaceRequestNoAllocs } from './set/multileg_order_cancel_replace_request_no_allocs'
import { IMultilegOrderCancelReplaceRequestNoTradingSessions } from './set/multileg_order_cancel_replace_request_no_trading_sessions'
import { IInstrument } from './set/instrument'
import { IMultilegOrderCancelReplaceRequestNoUnderlyings } from './set/multileg_order_cancel_replace_request_no_underlyings'
import { IMultilegOrderCancelReplaceRequestNoLegs } from './set/multileg_order_cancel_replace_request_no_legs'
import { IOrderQtyData } from './set/order_qty_data'
import { ICommissionData } from './set/commission_data'
import { IPegInstructions } from './set/peg_instructions'
import { IDiscretionInstructions } from './set/discretion_instructions'
import { IStandardTrailer } from './set/standard_trailer'

export interface IMultilegOrderCancelReplaceRequest {
  StandardHeader: IStandardHeader
  OrderID?: string// 37
  OrigClOrdID: string// 41
  ClOrdID: string// 11
  SecondaryClOrdID?: string// 526
  ClOrdLinkID?: string// 583
  OrigOrdModTime?: Date// 586
  Parties?: IParties
  TradeOriginationDate?: Date// 229
  TradeDate?: Date// 75
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  DayBookingInst?: string// 589
  BookingUnit?: string// 590
  PreallocMethod?: string// 591
  AllocID?: string// 70
  NoAllocs?: IMultilegOrderCancelReplaceRequestNoAllocs[]
  SettlType?: string// 63
  SettlDate?: Date// 64
  CashMargin?: string// 544
  ClearingFeeIndicator?: string// 635
  HandlInst?: string// 21
  ExecInst?: string// 18
  MinQty?: number// 110
  MaxFloor?: number// 111
  ExDestination?: string// 100
  NoTradingSessions?: IMultilegOrderCancelReplaceRequestNoTradingSessions[]
  ProcessCode?: string// 81
  Side: string// 54
  Instrument?: IInstrument
  NoUnderlyings?: IMultilegOrderCancelReplaceRequestNoUnderlyings[]
  PrevClosePx?: number// 140
  NoLegs: IMultilegOrderCancelReplaceRequestNoLegs[]
  LocateReqd?: boolean// 114
  TransactTime: Date// 60
  QtyType?: number// 854
  OrderQtyData?: IOrderQtyData
  OrdType: string// 40
  PriceType?: number// 423
  Price?: number// 44
  StopPx?: number// 99
  Currency?: string// 15
  ComplianceID?: string// 376
  SolicitedFlag?: boolean// 377
  IOIID?: string// 23
  QuoteID?: string// 117
  TimeInForce?: string// 59
  EffectiveTime?: Date// 168
  ExpireDate?: Date// 432
  ExpireTime?: Date// 126
  GTBookingInst?: number// 427
  CommissionData?: ICommissionData
  OrderCapacity?: string// 528
  OrderRestrictions?: string// 529
  CustOrderCapacity?: number// 582
  ForexReq?: boolean// 121
  SettlCurrency?: string// 120
  BookingType?: number// 775
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  PositionEffect?: string// 77
  CoveredOrUncovered?: number// 203
  MaxShow?: number// 210
  PegInstructions?: IPegInstructions
  DiscretionInstructions?: IDiscretionInstructions
  TargetStrategy?: number// 847
  TargetStrategyParameters?: string// 848
  ParticipationRate?: number// 849
  CancellationRights?: string// 480
  MoneyLaunderingStatus?: string// 481
  RegistID?: string// 513
  Designation?: string// 494
  MultiLegRptTypeReq?: number// 563
  StandardTrailer: IStandardTrailer
}
