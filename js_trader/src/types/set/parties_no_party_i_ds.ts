import { IPartiesNoPartyIDsNoPartySubIDs } from './parties_no_party_i_ds_no_party_sub_i_ds'

export interface IPartiesNoPartyIDs {
  PartyID?: string// 448
  PartyIDSource?: string// 447
  PartyRole?: number// 452
  NoPartySubIDs?: IPartiesNoPartyIDsNoPartySubIDs[]
}
