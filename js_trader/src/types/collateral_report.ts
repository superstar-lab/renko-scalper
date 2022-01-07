import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { ICollateralReportNoExecs } from './set/collateral_report_no_execs'
import { ICollateralReportNoTrades } from './set/collateral_report_no_trades'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { ICollateralReportNoLegs } from './set/collateral_report_no_legs'
import { ICollateralReportNoUnderlyings } from './set/collateral_report_no_underlyings'
import { ITrdRegTimestamps } from './set/trd_reg_timestamps'
import { ICollateralReportNoMiscFees } from './set/collateral_report_no_misc_fees'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IStipulations } from './set/stipulations'
import { ISettlInstructionsData } from './set/settl_instructions_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface ICollateralReport {
  StandardHeader: IStandardHeader
  CollRptID: string// 908
  CollInquiryID?: string// 909
  CollStatus: number// 910
  TotNumReports?: number// 911
  LastRptRequested?: boolean// 912
  Parties?: IParties
  Account?: string// 1
  AccountType?: number// 581
  ClOrdID?: string// 11
  OrderID?: string// 37
  SecondaryOrderID?: string// 198
  SecondaryClOrdID?: string// 526
  NoExecs?: ICollateralReportNoExecs[]
  NoTrades?: ICollateralReportNoTrades[]
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  SettlDate?: Date// 64
  Quantity?: number// 53
  QtyType?: number// 854
  Currency?: string// 15
  NoLegs?: ICollateralReportNoLegs[]
  NoUnderlyings?: ICollateralReportNoUnderlyings[]
  MarginExcess?: number// 899
  TotalNetValue?: number// 900
  CashOutstanding?: number// 901
  TrdRegTimestamps?: ITrdRegTimestamps
  Side?: string// 54
  NoMiscFees?: ICollateralReportNoMiscFees[]
  Price?: number// 44
  PriceType?: number// 423
  AccruedInterestAmt?: number// 159
  EndAccruedInterestAmt?: number// 920
  StartCash?: number// 921
  EndCash?: number// 922
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  Stipulations?: IStipulations
  SettlInstructionsData?: ISettlInstructionsData
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
