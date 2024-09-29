import { Request, Response } from "express"
import { ServiceRepositoryPostgres } from "../infrastructure/repositories/ServiceRepositoryPostgres"
import { RegisterService } from "../application/use-cases/service/RegisterService"
import { YupValidator } from "../application/services/Validator"
import { ListService } from "../application/use-cases/service/ListService"

export class ServiceController {
  private listService: ListService
  private registerService: RegisterService

  constructor() {
    this.registerService = new RegisterService(new ServiceRepositoryPostgres(), new YupValidator())
    this.listService = new ListService(new ServiceRepositoryPostgres())
  }

  async listServiceController(req: Request, res: Response) {
    try {
      const service = await this.listService.execute()
      res.status(200).json(service)
    } catch (error: any) {
      res.status(404).json({message: error?.message ?? 'Erro desconhecido'})
    }
  }

  async registerServiceController(req: Request, res: Response) {
    try {
      await this.registerService.execute(req.body)
      res.status(201).json()
    } catch (error: any) {
      res.status(404).json({message: error?.message ?? 'Erro desconhecido'})
    }
  }
}
