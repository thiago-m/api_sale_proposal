import { productType } from "../entities/Product"
import { serviceType } from "../entities/Service"
import { saleProposalType } from "../entities/SaleProposalItem"

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

export interface ServiceInputDTO {
  name: string
  description: string
  price: number
  type: serviceType
}

export interface SaleProposalInputDTO {
  name: string
  client_id: string
  itens: Array<{type: saleProposalType, itens: Array<string>}>
}

export interface Validator {
  normalizeInput(clientInput: ClientInputDTO): ClientInputDTO
  ClientValidateInput(clientInput: ClientInputDTO): Promise<void>
  ProductValidateInput(productInput: ProductInputDTO): Promise<void>
  ServiceValidateInput(serviceInput: ServiceInputDTO): Promise<void>
}
