import { Request, Response } from "express"
import { ProductRepositoryPostgres } from "../infrastructure/repositories/ProductRepositoryPostgres"
import { RegisterProduct } from "../application/use-cases/product/RegisterProduct"
import { YupValidator } from "../application/services/Validator"
import { ListProduct } from "../application/use-cases/product/ListProduct"

export class ProductController {
  private listProduct: ListProduct
  private registerProduct: RegisterProduct

  constructor() {
    this.registerProduct = new RegisterProduct(new ProductRepositoryPostgres(), new YupValidator())
    this.listProduct = new ListProduct(new ProductRepositoryPostgres())
  }

  async listProductController(req: Request, res: Response) {
    try {
      const product = await this.listProduct.execute()
      res.status(200).json(product)
    } catch (error: any) {
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }

  async registerProductController(req: Request, res: Response) {
    try {
      await this.registerProduct.execute(req.body)
      res.status(201).json()
    } catch (error: any) {
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }
}
