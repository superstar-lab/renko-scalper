import { IInstrumentLeg } from './instrument_leg'
import { ILegStipulations } from './leg_stipulations'
import { IMultilegOrderCancelReplaceRequestNoLegsNoLegAllocs } from './multileg_order_cancel_replace_request_no_legs_no_leg_allocs'
import { INestedParties } from './nested_parties'

export interface IMultilegOrderCancelReplaceRequestNoLegs {
  InstrumentLeg: IInstrumentLeg
  LegQty?: number// 687
  LegSwapType?: number// 690
  LegStipulations: ILegStipulations
  NoLegAllocs?: IMultilegOrderCancelReplaceRequestNoLegsNoLegAllocs[]
  LegPositionEffect?: string// 564
  LegCoveredOrUncovered?: number// 565
  NestedParties: INestedParties
  LegRefID?: string// 654
  LegPrice?: number// 566
  LegSettlType?: string// 587
  LegSettlDate?: Date// 588
}
