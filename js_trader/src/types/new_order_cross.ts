import { IStandardHeader } from './set/standard_header'
import { INewOrderCrossNoSides } from './set/new_order_cross_no_sides'
import { IInstrument } from './set/instrument'
import { INewOrderCrossNoUnderlyings } from './set/new_order_cross_no_underlyings'
import { INewOrderCrossNoLegs } from './set/new_order_cross_no_legs'
import { INewOrderCrossNoTradingSessions } from './set/new_order_cross_no_trading_sessions'
import { IStipulations } from './set/stipulations'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IYieldData } from './set/yield_data'
import { IPegInstructions } from './set/peg_instructions'
import { IDiscretionInstructions } from './set/discretion_instructions'
import { IStandardTrailer } from './set/standard_trailer'

export interface INewOrderCross {
  StandardHeader: IStandardHeader
  CrossID: string// 548
  CrossType: number// 549
  CrossPrioritization: number// 550
  NoSides: INewOrderCrossNoSides[]
  Instrument?: IInstrument
  NoUnderlyings?: INewOrderCrossNoUnderlyings[]
  NoLegs?: INewOrderCrossNoLegs[]
  SettlType?: string// 63
  SettlDate?: Date// 64
  HandlInst?: string// 21
  ExecInst?: string// 18
  MinQty?: number// 110
  MaxFloor?: number// 111
  ExDestination?: string// 100
  NoTradingSessions?: INewOrderCrossNoTradingSessions[]
  ProcessCode?: string// 81
  PrevClosePx?: number// 140
  LocateReqd?: boolean// 114
  TransactTime: Date// 60
  Stipulations?: IStipulations
  OrdType: string// 40
  PriceType?: number// 423
  Price?: number// 44
  StopPx?: number// 99
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  YieldData?: IYieldData
  Currency?: string// 15
  ComplianceID?: string// 376
  IOIID?: string// 23
  QuoteID?: string// 117
  TimeInForce?: string// 59
  EffectiveTime?: Date// 168
  ExpireDate?: Date// 432
  ExpireTime?: Date// 126
  GTBookingInst?: number// 427
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
  StandardTrailer: IStandardTrailer
}
