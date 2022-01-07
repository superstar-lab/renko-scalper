import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { ICollateralRequestNoExecs } from './set/collateral_request_no_execs'
import { ICollateralRequestNoTrades } from './set/collateral_request_no_trades'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { ICollateralRequestNoLegs } from './set/collateral_request_no_legs'
import { ICollateralRequestNoUnderlyings } from './set/collateral_request_no_underlyings'
import { ITrdRegTimestamps } from './set/trd_reg_timestamps'
import { ICollateralRequestNoMiscFees } from './set/collateral_request_no_misc_fees'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IStipulations } from './set/stipulations'
import { IStandardTrailer } from './set/standard_trailer'

export interface ICollateralRequest {
  StandardHeader: IStandardHeader
  CollReqID: string// 894
  CollAsgnReason: number// 895
  TransactTime: Date// 60
  ExpireTime?: Date// 126
  Parties?: IParties
  Account?: string// 1
  AccountType?: number// 581
  ClOrdID?: string// 11
  OrderID?: string// 37
  SecondaryOrderID?: string// 198
  SecondaryClOrdID?: string// 526
  NoExecs?: ICollateralRequestNoExecs[]
  NoTrades?: ICollateralRequestNoTrades[]
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  SettlDate?: Date// 64
  Quantity?: number// 53
  QtyType?: number// 854
  Currency?: string// 15
  NoLegs?: ICollateralRequestNoLegs[]
  NoUnderlyings?: ICollateralRequestNoUnderlyings[]
  MarginExcess?: number// 899
  TotalNetValue?: number// 900
  CashOutstanding?: number// 901
  TrdRegTimestamps?: ITrdRegTimestamps
  Side?: string// 54
  NoMiscFees?: ICollateralRequestNoMiscFees[]
  Price?: number// 44
  PriceType?: number// 423
  AccruedInterestAmt?: number// 159
  EndAccruedInterestAmt?: number// 920
  StartCash?: number// 921
  EndCash?: number// 922
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  Stipulations?: IStipulations
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  SettlSessID?: string// 716
  SettlSessSubID?: string// 717
  ClearingBusinessDate?: Date// 715
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
