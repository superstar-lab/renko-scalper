import { IUnderlyingInstrument } from './underlying_instrument'

export interface ICollateralResponseNoUnderlyings {
  UnderlyingInstrument?: IUnderlyingInstrument
  CollAction?: number// 944
}
