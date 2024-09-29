export enum saleProposalType { 'product', 'service' }

export class SaleProposalItemDb {
  constructor(
    public id: string,
    public sale_proposal_id: string,
    public type: saleProposalType,
    public item_id: string
  ) {}
}
