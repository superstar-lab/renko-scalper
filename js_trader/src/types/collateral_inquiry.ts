import { IStandardHeader } from './set/standard_header'
import { ICollateralInquiryNoCollInquiryQualifier } from './set/collateral_inquiry_no_coll_inquiry_qualifier'
import { IParties } from './set/parties'
import { ICollateralInquiryNoExecs } from './set/collateral_inquiry_no_execs'
import { ICollateralInquiryNoTrades } from './set/collateral_inquiry_no_trades'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { ICollateralInquiryNoLegs } from './set/collateral_inquiry_no_legs'
import { ICollateralInquiryNoUnderlyings } from './set/collateral_inquiry_no_underlyings'
import { ITrdRegTimestamps } from './set/trd_reg_timestamps'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IStipulations } from './set/stipulations'
import { ISettlInstructionsData } from './set/settl_instructions_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface ICollateralInquiry {
  StandardHeader: IStandardHeader
  CollInquiryID?: string// 909
  NoCollInquiryQualifier?: ICollateralInquiryNoCollInquiryQualifier[]
  SubscriptionRequestType?: string// 263
  ResponseTransportType?: number// 725
  ResponseDestination?: string// 726
  Parties?: IParties
  Account?: string// 1
  AccountType?: number// 581
  ClOrdID?: string// 11
  OrderID?: string// 37
  SecondaryOrderID?: string// 198
  SecondaryClOrdID?: string// 526
  NoExecs?: ICollateralInquiryNoExecs[]
  NoTrades?: ICollateralInquiryNoTrades[]
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  SettlDate?: Date// 64
  Quantity?: number// 53
  QtyType?: number// 854
  Currency?: string// 15
  NoLegs?: ICollateralInquiryNoLegs[]
  NoUnderlyings?: ICollateralInquiryNoUnderlyings[]
  MarginExcess?: number// 899
  TotalNetValue?: number// 900
  CashOutstanding?: number// 901
  TrdRegTimestamps?: ITrdRegTimestamps
  Side?: string// 54
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
