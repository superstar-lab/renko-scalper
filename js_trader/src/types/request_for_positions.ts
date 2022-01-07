import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IRequestForPositionsNoLegs } from './set/request_for_positions_no_legs'
import { IRequestForPositionsNoUnderlyings } from './set/request_for_positions_no_underlyings'
import { IRequestForPositionsNoTradingSessions } from './set/request_for_positions_no_trading_sessions'
import { IStandardTrailer } from './set/standard_trailer'

export interface IRequestForPositions {
  StandardHeader: IStandardHeader
  PosReqID: string// 710
  PosReqType: number// 724
  MatchStatus?: string// 573
  SubscriptionRequestType?: string// 263
  Parties?: IParties
  Account: string// 1
  AcctIDSource?: number// 660
  AccountType: number// 581
  Instrument?: IInstrument
  Currency?: string// 15
  NoLegs?: IRequestForPositionsNoLegs[]
  NoUnderlyings?: IRequestForPositionsNoUnderlyings[]
  ClearingBusinessDate: Date// 715
  SettlSessID?: string// 716
  SettlSessSubID?: string// 717
  NoTradingSessions?: IRequestForPositionsNoTradingSessions[]
  TransactTime: Date// 60
  ResponseTransportType?: number// 725
  ResponseDestination?: string// 726
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
