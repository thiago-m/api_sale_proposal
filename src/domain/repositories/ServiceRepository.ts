import { Service } from "../entities/Service"

export interface ServiceRepository {
  list(): Promise<Array<Service> | []>
  getByName(id: string): Promise<Service | null>
  register(service: Service): Promise<void>
}
