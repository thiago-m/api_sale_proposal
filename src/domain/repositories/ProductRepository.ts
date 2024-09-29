import { Product } from "../entities/Product"

export interface ProductRepository {
  list(): Promise<Array<Product> | []>
  getByName(id: string): Promise<Product | null>
  register(product: Product): Promise<void>
}
