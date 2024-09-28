import { ClientRepository } from "../../domain/repositories/ClientRepository"

export class GetByEmailClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(email: string) {
    console.log('GetByEmailClient - email', email)
    const client = await this.clientRepository.getByEmail(email)
    if (!client) throw new Error('Client not found')
    return client
  }
}
