import { IInstrumentLeg } from './instrument_leg'
import { ILegStipulations } from './leg_stipulations'
import { INewOrderMultilegNoLegsNoLegAllocs } from './new_order_multileg_no_legs_no_leg_allocs'
import { INestedParties } from './nested_parties'

export interface INewOrderMultilegNoLegs {
  InstrumentLeg: IInstrumentLeg
  LegQty?: number// 687
  LegSwapType?: number// 690
  LegStipulations: ILegStipulations
  NoLegAllocs?: INewOrderMultilegNoLegsNoLegAllocs[]
  LegPositionEffect?: string// 564
  LegCoveredOrUncovered?: number// 565
  NestedParties: INestedParties
  LegRefID?: string// 654
  LegPrice?: number// 566
  LegSettlType?: string// 587
  LegSettlDate?: Date// 588
}
