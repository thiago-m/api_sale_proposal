import { SaleProposalRepository } from "../../../domain/repositories/SaleProposalRepository"

export class GetSaleProposal {
  constructor(private saleProposalRepository: SaleProposalRepository) {}

  async execute(id: string) {
    const saleProposal = await this.saleProposalRepository.getById(id)
    if (!saleProposal) throw new Error('Client not found')
    return saleProposal
  }
}
