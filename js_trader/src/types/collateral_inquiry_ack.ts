import { IStandardHeader } from './set/standard_header'
import { ICollateralInquiryAckNoCollInquiryQualifier } from './set/collateral_inquiry_ack_no_coll_inquiry_qualifier'
import { IParties } from './set/parties'
import { ICollateralInquiryAckNoExecs } from './set/collateral_inquiry_ack_no_execs'
import { ICollateralInquiryAckNoTrades } from './set/collateral_inquiry_ack_no_trades'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { ICollateralInquiryAckNoLegs } from './set/collateral_inquiry_ack_no_legs'
import { ICollateralInquiryAckNoUnderlyings } from './set/collateral_inquiry_ack_no_underlyings'
import { IStandardTrailer } from './set/standard_trailer'

export interface ICollateralInquiryAck {
  StandardHeader: IStandardHeader
  CollInquiryID: string// 909
  CollInquiryStatus: number// 945
  CollInquiryResult?: number// 946
  NoCollInquiryQualifier?: ICollateralInquiryAckNoCollInquiryQualifier[]
  TotNumReports?: number// 911
  Parties?: IParties
  Account?: string// 1
  AccountType?: number// 581
  ClOrdID?: string// 11
  OrderID?: string// 37
  SecondaryOrderID?: string// 198
  SecondaryClOrdID?: string// 526
  NoExecs?: ICollateralInquiryAckNoExecs[]
  NoTrades?: ICollateralInquiryAckNoTrades[]
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  SettlDate?: Date// 64
  Quantity?: number// 53
  QtyType?: number// 854
  Currency?: string// 15
  NoLegs?: ICollateralInquiryAckNoLegs[]
  NoUnderlyings?: ICollateralInquiryAckNoUnderlyings[]
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  SettlSessID?: string// 716
  SettlSessSubID?: string// 717
  ClearingBusinessDate?: Date// 715
  ResponseTransportType?: number// 725
  ResponseDestination?: string// 726
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
