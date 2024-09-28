import { ClientRepository } from "../../domain/repositories/ClientRepository"

export class ListClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    const client = await this.clientRepository.list()
    return client ?? []
  }
}
