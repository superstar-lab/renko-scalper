import { IUnderlyingInstrument } from './underlying_instrument'

export interface IListStrikePriceNoUnderlyings {
  UnderlyingInstrument?: IUnderlyingInstrument
  PrevClosePx?: number// 140
  ClOrdID?: string// 11
  SecondaryClOrdID?: string// 526
  Side?: string// 54
  Price: number// 44
  Currency?: string// 15
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
}
