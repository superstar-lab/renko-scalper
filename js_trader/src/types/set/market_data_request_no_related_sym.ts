import { IInstrument } from './instrument'
import { IMarketDataRequestNoRelatedSymNoUnderlyings } from './market_data_request_no_related_sym_no_underlyings'
import { IMarketDataRequestNoRelatedSymNoLegs } from './market_data_request_no_related_sym_no_legs'

export interface IMarketDataRequestNoRelatedSym {
  Instrument: IInstrument
  NoUnderlyings?: IMarketDataRequestNoRelatedSymNoUnderlyings[]
  NoLegs?: IMarketDataRequestNoRelatedSymNoLegs[]
}
