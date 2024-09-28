import { Request, Response } from "express"
import { GetClient } from "../application/use-cases/GetClient"
import { ClientRepositoryPostgres } from "../infrastructure/repositories/ClientRepositoryPostgres"
import { RegisterClient } from "../application/use-cases/RegisterClient"
import { YupValidator } from "../application/services/Validator"
import { BcryptEncrypter } from "../application/services/Encrypter"
import { ListClient } from "../application/use-cases/ListClient"
import { GetByEmailClient } from "../application/use-cases/GetByEmailClient"

export class ClientController {
  private getClient: GetClient
  private getClientByEmail: GetByEmailClient
  private listClient: ListClient
  private registerClient: RegisterClient

  constructor() {
    this.getClient = new GetClient(new ClientRepositoryPostgres())
    this.getClientByEmail = new GetByEmailClient(new ClientRepositoryPostgres())
    this.listClient = new ListClient(new ClientRepositoryPostgres())
    this.registerClient = new RegisterClient(new ClientRepositoryPostgres(), new YupValidator(), new BcryptEncrypter())
  }

  async getClientController(req: Request, res: Response): Promise<void> {
    try {
      const client = await this.getClient.execute(req.params.id)
      res.status(200).json(client)
    } catch (error: any) {
      res.status(404).json(error?.message ?? 'Erro desconhecido')
    }
  }

  async getClientByEmailController(res: Response, email: string): Promise<void> {
    try {
      const client = await this.getClientByEmail.execute(email)
      res.status(200).json(client)
    } catch (error: any) {
      res.status(404).json(error?.message ?? 'Erro desconhecido')
    }
  }

  async listClientController(req: Request, res: Response): Promise<void> {
    try {
      const email = req.query.email ? req.query.email.toString() : null
      if(email) return await this.getClientByEmailController(res, email)
      const client = await this.listClient.execute()
      res.status(200).json(client)
    } catch (error: any) {
      res.status(404).json('Erro desconhecido')
    }
  }

  async registerClientController(req: Request, res: Response): Promise<void> {
    try {
      await this.registerClient.execute(req.body)
      res.status(201)
    } catch (error: any) {
      res.status(404).json(error?.message ?? 'Erro desconhecido')
    }
  }
}
