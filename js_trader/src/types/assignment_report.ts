import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IAssignmentReportNoLegs } from './set/assignment_report_no_legs'
import { IAssignmentReportNoUnderlyings } from './set/assignment_report_no_underlyings'
import { IPositionQty } from './set/position_qty'
import { IPositionAmountData } from './set/position_amount_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface IAssignmentReport {
  StandardHeader: IStandardHeader
  AsgnRptID: string// 833
  TotNumAssignmentReports?: number// 832
  LastRptRequested?: boolean// 912
  Parties?: IParties
  Account?: string// 1
  AccountType: number// 581
  Instrument?: IInstrument
  Currency?: string// 15
  NoLegs?: IAssignmentReportNoLegs[]
  NoUnderlyings?: IAssignmentReportNoUnderlyings[]
  PositionQty?: IPositionQty
  PositionAmountData?: IPositionAmountData
  ThresholdAmount?: number// 834
  SettlPrice: number// 730
  SettlPriceType: number// 731
  UnderlyingSettlPrice: number// 732
  ExpireDate?: Date// 432
  AssignmentMethod: string// 744
  AssignmentUnit?: number// 745
  OpenInterest: number// 746
  ExerciseMethod: string// 747
  SettlSessID: string// 716
  SettlSessSubID: string// 717
  ClearingBusinessDate: Date// 715
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
