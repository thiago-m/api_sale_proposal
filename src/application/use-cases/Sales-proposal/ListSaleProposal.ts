import { SaleProposalRepository } from "../../../domain/repositories/SaleProposalRepository"

export class ListSaleProposal {
  constructor(private saleProposalRepository: SaleProposalRepository) {}

  async execute() {
    const saleProposal = await this.saleProposalRepository.list()
    return saleProposal ?? []
  }
}
