import { Product } from "../entities/Product"

export interface ProductRepository {
  list(): Promise<Array<Product> | []>
  getById(id: string): Promise<Product | null>
  getByName(name: string): Promise<Product | null>
  register(product: Product): Promise<void>
}
