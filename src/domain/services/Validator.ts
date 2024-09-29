import { productType } from "../entities/Product"

export interface ClientInputDTO {
  name: string
  email: string
  password: string
  repeat_password: string
}

export interface ProductInputDTO {
  name: string
  description: string
  price: number
  type: productType
}

export interface Validator {
  normalizeInput(clientInput: ClientInputDTO): ClientInputDTO
  ClientValidateInput(clientInput: ClientInputDTO): Promise<void>
  ProductValidateInput(productInput: ProductInputDTO): Promise<void>
}
