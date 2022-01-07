import { INestedParties } from './nested_parties'
import { ICommissionData } from './commission_data'
import { IAllocationInstructionNoAllocsNoMiscFees } from './allocation_instruction_no_allocs_no_misc_fees'
import { ISettlInstructionsData } from './settl_instructions_data'

export interface IAllocationInstructionNoAllocs {
  AllocAccount: string// 79
  AllocAcctIDSource?: number// 661
  MatchStatus?: string// 573
  AllocPrice?: number// 366
  AllocQty: number// 80
  IndividualAllocID?: string// 467
  ProcessCode?: string// 81
  NestedParties: INestedParties
  NotifyBrokerOfCredit?: boolean// 208
  AllocHandlInst?: number// 209
  AllocText?: string// 161
  EncodedAllocTextLen?: number// 360
  EncodedAllocText?: Buffer// 361
  CommissionData: ICommissionData
  AllocAvgPx?: number// 153
  AllocNetMoney?: number// 154
  SettlCurrAmt?: number// 119
  AllocSettlCurrAmt?: number// 737
  SettlCurrency?: string// 120
  AllocSettlCurrency?: string// 736
  SettlCurrFxRate?: number// 155
  SettlCurrFxRateCalc?: string// 156
  AllocAccruedInterestAmt?: number// 742
  AllocInterestAtMaturity?: number// 741
  SettlInstMode?: string// 160
  NoMiscFees?: IAllocationInstructionNoAllocsNoMiscFees[]
  NoClearingInstructions?: number// 576
  ClearingInstruction?: number// 577
  ClearingFeeIndicator?: string// 635
  AllocSettlInstType?: number// 780
  SettlInstructionsData: ISettlInstructionsData
}
