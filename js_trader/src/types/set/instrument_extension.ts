import { IInstrumentExtensionNoInstrAttrib } from './instrument_extension_no_instr_attrib'

export interface IInstrumentExtension {
  DeliveryForm?: number// 668
  PctAtRisk?: number// 869
  NoInstrAttrib?: IInstrumentExtensionNoInstrAttrib[]
}
