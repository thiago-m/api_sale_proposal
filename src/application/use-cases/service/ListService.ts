import { ServiceRepository } from "../../../domain/repositories/ServiceRepository"

export class ListService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute() {
    const service = await this.serviceRepository.list()
    return service ?? []
  }
}
