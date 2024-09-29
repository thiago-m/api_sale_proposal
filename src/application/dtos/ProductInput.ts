import { productType } from "../../domain/entities/Product"

export interface ProductInput {
  name: string
  description: string
  price: number
  type: productType
}
