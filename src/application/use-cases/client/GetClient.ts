import { ClientRepository } from "../../../domain/repositories/ClientRepository"

export class GetClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string) {
    const client = await this.clientRepository.getById(id)
    if (!client) throw new Error('Client not found')
    return client
  }
}
