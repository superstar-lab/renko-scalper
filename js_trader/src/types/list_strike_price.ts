import { IStandardHeader } from './set/standard_header'
import { IListStrikePriceNoStrikes } from './set/list_strike_price_no_strikes'
import { IListStrikePriceNoUnderlyings } from './set/list_strike_price_no_underlyings'
import { IStandardTrailer } from './set/standard_trailer'

export interface IListStrikePrice {
  StandardHeader: IStandardHeader
  ListID: string// 66
  TotNoStrikes: number// 422
  LastFragment?: boolean// 893
  NoStrikes: IListStrikePriceNoStrikes[]
  NoUnderlyings?: IListStrikePriceNoUnderlyings[]
  StandardTrailer: IStandardTrailer
}
