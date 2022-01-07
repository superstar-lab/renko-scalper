import { IStandardHeader } from './set/standard_header'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { IIndicationOfInterestNoUnderlyings } from './set/indication_of_interest_no_underlyings'
import { IOrderQtyData } from './set/order_qty_data'
import { IStipulations } from './set/stipulations'
import { IIndicationOfInterestNoLegs } from './set/indication_of_interest_no_legs'
import { IIndicationOfInterestNoIOIQualifiers } from './set/indication_of_interest_no_ioi_qualifiers'
import { IIndicationOfInterestNoRoutingIDs } from './set/indication_of_interest_no_routing_i_ds'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IYieldData } from './set/yield_data'
import { IStandardTrailer } from './set/standard_trailer'

export interface IIndicationOfInterest {
  StandardHeader: IStandardHeader
  IOIID: string// 23
  IOITransType: string// 28
  IOIRefID?: string// 26
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  NoUnderlyings?: IIndicationOfInterestNoUnderlyings[]
  Side: string// 54
  QtyType?: number// 854
  OrderQtyData?: IOrderQtyData
  IOIQty: string// 27
  Currency?: string// 15
  Stipulations?: IStipulations
  NoLegs?: IIndicationOfInterestNoLegs[]
  PriceType?: number// 423
  Price?: number// 44
  ValidUntilTime?: Date// 62
  IOIQltyInd?: string// 25
  IOINaturalFlag?: boolean// 130
  NoIOIQualifiers?: IIndicationOfInterestNoIOIQualifiers[]
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  TransactTime?: Date// 60
  URLLink?: string// 149
  NoRoutingIDs?: IIndicationOfInterestNoRoutingIDs[]
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  YieldData?: IYieldData
  StandardTrailer: IStandardTrailer
}
