import { Request, Response } from "express"
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import { SaleProposalRepositoryPostgres } from "../infrastructure/repositories/SaleProposalRepositoryPostgres"
import { RegisterSaleProposal } from "../application/use-cases/Sales-proposal/RegisterSaleProposal"
import { ClientRepositoryPostgres } from "../infrastructure/repositories/ClientRepositoryPostgres"
import { ProductRepositoryPostgres } from "../infrastructure/repositories/ProductRepositoryPostgres"
import { ServiceRepositoryPostgres } from "../infrastructure/repositories/ServiceRepositoryPostgres"
import { ListSaleProposal } from "../application/use-cases/Sales-proposal/ListSaleProposal"
import { GetSaleProposal } from "../application/use-cases/Sales-proposal/GetSaleProposal"
import { SendSaleProposal } from "../application/use-cases/Sales-proposal/SendSaleProposalByEmail"

dotenv.config()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'sa-east-1',
})

export class SaleProposalController {
  private listSaleProposal: ListSaleProposal
  private registerSaleProposal: RegisterSaleProposal
  private getSaleProposal: GetSaleProposal
  private sendSaleProposal: SendSaleProposal

  constructor() {
    this.registerSaleProposal = new RegisterSaleProposal(
      new SaleProposalRepositoryPostgres(),
      new ClientRepositoryPostgres(),
      new ProductRepositoryPostgres(),
      new ServiceRepositoryPostgres()
    )
    this.listSaleProposal = new ListSaleProposal( new SaleProposalRepositoryPostgres() )
    this.getSaleProposal = new GetSaleProposal( new SaleProposalRepositoryPostgres() )
    this.sendSaleProposal = new SendSaleProposal( new AWS.SES() )
  }

  async sendSaleProposalByEmailController(req: Request, res: Response) {
    try {
      const saleProposal = await this.getSaleProposal.execute(req.params.id)
      await this.sendSaleProposal.execute(saleProposal)
      res.status(200).json()
    } catch (error: any) {
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }

  async getSaleProposalController(req: Request, res: Response) {
    try {
      const saleProposal = await this.getSaleProposal.execute(req.params.id)
      res.status(200).json(saleProposal)
    } catch (error: any) {
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }

  async listSaleProposalController(req: Request, res: Response) {
    try {
      const saleProposal = await this.listSaleProposal.execute()
      res.status(200).json(saleProposal)
    } catch (error: any) {
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }

  async registerSaleProposalController(req: Request, res: Response) {
    try {
      await this.registerSaleProposal.execute(req.body)
      res.status(201).json()
    } catch (error: any) {
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }
}
