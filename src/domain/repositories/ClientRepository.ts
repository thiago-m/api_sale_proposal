import { Client } from "../entities/Client"

export interface ClientRepository {
  list(): Promise<Array<Omit<Client, 'password'>> | []>
  get(id: string): Promise<Omit<Client, 'password'> | null>
  getByEmail(email: string): Promise<Omit<Client, 'password'> | null>
  register(client: Client): Promise<void>
}
