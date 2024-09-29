import { serviceType } from "../../domain/entities/Service"

export interface ServiceInput {
  name: string
  description: string
  price: number
  type: serviceType
}
