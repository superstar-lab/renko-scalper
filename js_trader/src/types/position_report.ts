import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IPositionReportNoLegs } from './set/position_report_no_legs'
import { IPositionReportNoUnderlyings } from './set/position_report_no_underlyings'
import { IPositionQty } from './set/position_qty'
import { IPositionAmountData } from './set/position_amount_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface IPositionReport {
  StandardHeader: IStandardHeader
  PosMaintRptID?: string// 721
  PosReqID?: string// 710
  PosReqType?: number// 724
  SubscriptionRequestType?: string// 263
  TotalNumPosReports?: number// 727
  UnsolicitedIndicator?: boolean// 325
  PosReqResult?: number// 728
  ClearingBusinessDate?: Date// 715
  SettlSessID?: string// 716
  SettlSessSubID?: string// 717
  Parties?: IParties
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  Instrument?: IInstrument
  Currency?: string// 15
  SettlPrice?: number// 730
  SettlPriceType?: number// 731
  PriorSettlPrice?: number// 734
  NoLegs?: IPositionReportNoLegs[]
  NoUnderlyings?: IPositionReportNoUnderlyings[]
  PositionQty?: IPositionQty
  PositionAmountData?: IPositionAmountData
  RegistStatus?: string// 506
  DeliveryDate?: Date// 743
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
