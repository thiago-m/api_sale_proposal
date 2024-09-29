import { SaleProposalDb, SaleProposalReturn } from "../entities/SaleProposal"
import { SaleProposalItemDb } from "../entities/SaleProposalItem"

export interface SaleProposalRepository {
  getById(id: string): Promise<SaleProposalReturn | null>
  list(): Promise<Array<SaleProposalReturn> | []>
  register(saleProposal: SaleProposalDb, saleProposalItem: Array<SaleProposalItemDb>): Promise<void>
}
