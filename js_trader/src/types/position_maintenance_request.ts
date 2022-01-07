import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IPositionMaintenanceRequestNoLegs } from './set/position_maintenance_request_no_legs'
import { IPositionMaintenanceRequestNoUnderlyings } from './set/position_maintenance_request_no_underlyings'
import { IPositionMaintenanceRequestNoTradingSessions } from './set/position_maintenance_request_no_trading_sessions'
import { IPositionQty } from './set/position_qty'
import { IStandardTrailer } from './set/standard_trailer'

export interface IPositionMaintenanceRequest {
  StandardHeader: IStandardHeader
  PosReqID: string// 710
  PosTransType: number// 709
  PosMaintAction: number// 712
  OrigPosReqRefID?: string// 713
  PosMaintRptRefID?: string// 714
  ClearingBusinessDate: Date// 715
  SettlSessID?: string// 716
  SettlSessSubID?: string// 717
  Parties?: IParties
  Account: string// 1
  AcctIDSource?: number// 660
  AccountType: number// 581
  Instrument?: IInstrument
  Currency?: string// 15
  NoLegs?: IPositionMaintenanceRequestNoLegs[]
  NoUnderlyings?: IPositionMaintenanceRequestNoUnderlyings[]
  NoTradingSessions?: IPositionMaintenanceRequestNoTradingSessions[]
  TransactTime: Date// 60
  PositionQty?: IPositionQty
  AdjustmentType?: number// 718
  ContraryInstructionIndicator?: boolean// 719
  PriorSpreadIndicator?: boolean// 720
  ThresholdAmount?: number// 834
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
