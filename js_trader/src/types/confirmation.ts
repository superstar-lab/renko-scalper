import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IConfirmationNoOrders } from './set/confirmation_no_orders'
import { ITrdRegTimestamps } from './set/trd_reg_timestamps'
import { IInstrument } from './set/instrument'
import { IInstrumentExtension } from './set/instrument_extension'
import { IFinancingDetails } from './set/financing_details'
import { IConfirmationNoUnderlyings } from './set/confirmation_no_underlyings'
import { IConfirmationNoLegs } from './set/confirmation_no_legs'
import { IYieldData } from './set/yield_data'
import { IConfirmationNoCapacities } from './set/confirmation_no_capacities'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { ISettlInstructionsData } from './set/settl_instructions_data'
import { ICommissionData } from './set/commission_data'
import { IStipulations } from './set/stipulations'
import { IConfirmationNoMiscFees } from './set/confirmation_no_misc_fees'
import { IStandardTrailer } from './set/standard_trailer'

export interface IConfirmation {
  StandardHeader: IStandardHeader
  ConfirmID: string// 664
  ConfirmRefID?: string// 772
  ConfirmReqID?: string// 859
  ConfirmTransType: number// 666
  ConfirmType: number// 773
  CopyMsgIndicator?: boolean// 797
  LegalConfirm?: boolean// 650
  ConfirmStatus: number// 665
  Parties?: IParties
  NoOrders?: IConfirmationNoOrders[]
  AllocID?: string// 70
  SecondaryAllocID?: string// 793
  IndividualAllocID?: string// 467
  TransactTime: Date// 60
  TradeDate: Date// 75
  TrdRegTimestamps?: ITrdRegTimestamps
  Instrument?: IInstrument
  InstrumentExtension?: IInstrumentExtension
  FinancingDetails?: IFinancingDetails
  NoUnderlyings: IConfirmationNoUnderlyings[]
  NoLegs: IConfirmationNoLegs[]
  YieldData?: IYieldData
  AllocQty: number// 80
  QtyType?: number// 854
  Side: string// 54
  Currency?: string// 15
  LastMkt?: string// 30
  NoCapacities: IConfirmationNoCapacities[]
  AllocAccount: string// 79
  AllocAcctIDSource?: number// 661
  AllocAccountType?: number// 798
  AvgPx: number// 6
  AvgPxPrecision?: number// 74
  PriceType?: number// 423
  AvgParPx?: number// 860
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  ReportedPx?: number// 861
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  ProcessCode?: string// 81
  GrossTradeAmt: number// 381
  NumDaysInterest?: number// 157
  ExDate?: Date// 230
  AccruedInterestRate?: number// 158
  AccruedInterestAmt?: number// 159
  InterestAtMaturity?: number// 738
  EndAccruedInterestAmt?: number// 920
  StartCash?: number// 921
  EndCash?: number// 922
  Concession?: number// 238
  TotalTakedown?: number// 237
  NetMoney: number// 118
  MaturityNetMoney?: number// 890
  SettlCurrAmt?: number// 119
  SettlCurrency?: string// 120
  SettlCurrFxRate?: number// 155
  SettlCurrFxRateCalc?: string// 156
  SettlType?: string// 63
  SettlDate?: Date// 64
  SettlInstructionsData?: ISettlInstructionsData
  CommissionData?: ICommissionData
  SharedCommission?: number// 858
  Stipulations?: IStipulations
  NoMiscFees?: IConfirmationNoMiscFees[]
  StandardTrailer: IStandardTrailer
}
