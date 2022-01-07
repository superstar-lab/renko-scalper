import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { INewOrderMultilegNoAllocs } from './set/new_order_multileg_no_allocs'
import { INewOrderMultilegNoTradingSessions } from './set/new_order_multileg_no_trading_sessions'
import { IInstrument } from './set/instrument'
import { INewOrderMultilegNoUnderlyings } from './set/new_order_multileg_no_underlyings'
import { INewOrderMultilegNoLegs } from './set/new_order_multileg_no_legs'
import { IOrderQtyData } from './set/order_qty_data'
import { ICommissionData } from './set/commission_data'
import { IPegInstructions } from './set/peg_instructions'
import { IDiscretionInstructions } from './set/discretion_instructions'
import { IStandardTrailer } from './set/standard_trailer'

export interface INewOrderMultileg {
  StandardHeader: IStandardHeader
  ClOrdID: string// 11
  SecondaryClOrdID?: string// 526
  ClOrdLinkID?: string// 583
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
  NoAllocs?: INewOrderMultilegNoAllocs[]
  SettlType?: string// 63
  SettlDate?: Date// 64
  CashMargin?: string// 544
  ClearingFeeIndicator?: string// 635
  HandlInst?: string// 21
  ExecInst?: string// 18
  MinQty?: number// 110
  MaxFloor?: number// 111
  ExDestination?: string// 100
  NoTradingSessions?: INewOrderMultilegNoTradingSessions[]
  ProcessCode?: string// 81
  Side: string// 54
  Instrument?: IInstrument
  NoUnderlyings?: INewOrderMultilegNoUnderlyings[]
  PrevClosePx?: number// 140
  NoLegs: INewOrderMultilegNoLegs[]
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
