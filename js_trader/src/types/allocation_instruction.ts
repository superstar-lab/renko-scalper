import { IStandardHeader } from './set/standard_header'
import { IAllocationInstructionNoOrders } from './set/allocation_instruction_no_orders'
import { IAllocationInstructionNoExecs } from './set/allocation_instruction_no_execs'
import { IInstrument } from './set/instrument'
import { IInstrumentExtension } from './set/instrument_extension'
import { IFinancingDetails } from './set/financing_details'
import { IAllocationInstructionNoUnderlyings } from './set/allocation_instruction_no_underlyings'
import { IAllocationInstructionNoLegs } from './set/allocation_instruction_no_legs'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IParties } from './set/parties'
import { IStipulations } from './set/stipulations'
import { IYieldData } from './set/yield_data'
import { IAllocationInstructionNoAllocs } from './set/allocation_instruction_no_allocs'
import { IStandardTrailer } from './set/standard_trailer'

export interface IAllocationInstruction {
  StandardHeader: IStandardHeader
  AllocID: string// 70
  AllocTransType: string// 71
  AllocType: number// 626
  SecondaryAllocID?: string// 793
  RefAllocID?: string// 72
  AllocCancReplaceReason?: number// 796
  AllocIntermedReqType?: number// 808
  AllocLinkID?: string// 196
  AllocLinkType?: number// 197
  BookingRefID?: string// 466
  AllocNoOrdersType: number// 857
  NoOrders?: IAllocationInstructionNoOrders[]
  NoExecs?: IAllocationInstructionNoExecs[]
  PreviouslyReported?: boolean// 570
  ReversalIndicator?: boolean// 700
  MatchType?: string// 574
  Side: string// 54
  Instrument?: IInstrument
  InstrumentExtension?: IInstrumentExtension
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: IAllocationInstructionNoUnderlyings[]
  NoLegs?: IAllocationInstructionNoLegs[]
  Quantity: number// 53
  QtyType?: number// 854
  LastMkt?: string// 30
  TradeOriginationDate?: Date// 229
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  PriceType?: number// 423
  AvgPx: number// 6
  AvgParPx?: number// 860
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  Currency?: string// 15
  AvgPxPrecision?: number// 74
  Parties?: IParties
  TradeDate: Date// 75
  TransactTime?: Date// 60
  SettlType?: string// 63
  SettlDate?: Date// 64
  BookingType?: number// 775
  GrossTradeAmt?: number// 381
  Concession?: number// 238
  TotalTakedown?: number// 237
  NetMoney?: number// 118
  PositionEffect?: string// 77
  AutoAcceptIndicator?: boolean// 754
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  NumDaysInterest?: number// 157
  AccruedInterestRate?: number// 158
  AccruedInterestAmt?: number// 159
  TotalAccruedInterestAmt?: number// 540
  InterestAtMaturity?: number// 738
  EndAccruedInterestAmt?: number// 920
  StartCash?: number// 921
  EndCash?: number// 922
  LegalConfirm?: boolean// 650
  Stipulations?: IStipulations
  YieldData?: IYieldData
  TotNoAllocs?: number// 892
  LastFragment?: boolean// 893
  NoAllocs: IAllocationInstructionNoAllocs[]
  StandardTrailer: IStandardTrailer
}
