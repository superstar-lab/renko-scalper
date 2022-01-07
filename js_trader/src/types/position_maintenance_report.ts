import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IPositionMaintenanceReportNoLegs } from './set/position_maintenance_report_no_legs'
import { IPositionMaintenanceReportNoUnderlyings } from './set/position_maintenance_report_no_underlyings'
import { IPositionMaintenanceReportNoTradingSessions } from './set/position_maintenance_report_no_trading_sessions'
import { IPositionQty } from './set/position_qty'
import { IPositionAmountData } from './set/position_amount_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface IPositionMaintenanceReport {
  StandardHeader: IStandardHeader
  PosMaintRptID: string// 721
  PosTransType: number// 709
  PosReqID?: string// 710
  PosMaintAction: number// 712
  OrigPosReqRefID: string// 713
  PosMaintStatus: number// 722
  PosMaintResult?: number// 723
  ClearingBusinessDate: Date// 715
  SettlSessID?: string// 716
  SettlSessSubID?: string// 717
  Parties?: IParties
  Account: string// 1
  AcctIDSource?: number// 660
  AccountType: number// 581
  Instrument?: IInstrument
  Currency?: string// 15
  NoLegs?: IPositionMaintenanceReportNoLegs[]
  NoUnderlyings?: IPositionMaintenanceReportNoUnderlyings[]
  NoTradingSessions?: IPositionMaintenanceReportNoTradingSessions[]
  TransactTime: Date// 60
  PositionQty?: IPositionQty
  PositionAmountData?: IPositionAmountData
  AdjustmentType?: number// 718
  ThresholdAmount?: number// 834
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
