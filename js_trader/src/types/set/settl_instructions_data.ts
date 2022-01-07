import { ISettlInstructionsDataNoDlvyInst } from './settl_instructions_data_no_dlvy_inst'

export interface ISettlInstructionsData {
  SettlDeliveryType?: number// 172
  StandInstDbType?: number// 169
  StandInstDbName?: string// 170
  StandInstDbID?: string// 171
  NoDlvyInst?: ISettlInstructionsDataNoDlvyInst[]
}
