import { IUnderlyingInstrument } from './underlying_instrument'

export interface ICollateralAssignmentNoUnderlyings {
  UnderlyingInstrument?: IUnderlyingInstrument
  CollAction?: number// 944
}
