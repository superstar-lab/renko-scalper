import { INestedPartiesNoNestedPartyIDsNoNestedPartySubIDs } from './nested_parties_no_nested_party_i_ds_no_nested_party_sub_i_ds'

export interface INestedPartiesNoNestedPartyIDs {
  NestedPartyID?: string// 524
  NestedPartyIDSource?: string// 525
  NestedPartyRole?: number// 538
  NoNestedPartySubIDs?: INestedPartiesNoNestedPartyIDsNoNestedPartySubIDs[]
}
