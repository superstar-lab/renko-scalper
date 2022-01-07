import { ISettlParties } from './settl_parties'

export interface ISettlInstructionsDataNoDlvyInst {
  SettlInstSource?: string// 165
  DlvyInstType?: string// 787
  SettlParties?: ISettlParties
}
