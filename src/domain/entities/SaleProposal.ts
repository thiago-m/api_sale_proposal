import { saleProposalType } from "./SaleProposalItem"

export class SaleProposalDb {
  constructor(
    public id: string,
    public name: string,
    public client_id: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}

export class SaleProposal {
  constructor(
    public id: string,
    public name: string,
    public client_id: string,
    public itens: Array<{type: saleProposalType, itens: Array<string>}>,
    public created_at: Date,
    public updated_at: Date
  ) {}
}

export class SaleProposalReturn {
  constructor(
    public id: string,
    public client: {id: string, name: string, email: string},
    public services: Array<{id: string, name: string, price: string}>,
    public products: Array<{id: string, name: string, price: string}>
  ) {}
}
