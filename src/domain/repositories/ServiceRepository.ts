import { Service } from "../entities/Service"

export interface ServiceRepository {
  list(): Promise<Array<Service> | []>
  getById(id: string): Promise<Service | null>
  getByName(name: string): Promise<Service | null>
  register(service: Service): Promise<void>
}
