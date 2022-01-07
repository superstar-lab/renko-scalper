import { IUnderlyingInstrument } from './underlying_instrument'

export interface ICollateralRequestNoUnderlyings {
  UnderlyingInstrument?: IUnderlyingInstrument
  CollAction?: number// 944
}
