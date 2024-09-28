import pool from '../database/PostgreSQL'
import { Client } from '../../domain/entities/Client'
import { ClientRepository } from '../../domain/repositories/ClientRepository'

export class ClientRepositoryPostgres implements ClientRepository {
  private readonly table = 'clients'

  async get(id: string): Promise<Omit<Client, 'password'> | null> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
    if (result.rows.length === 0) return null

    return result.rows.map(({id, name, email, created_at, updated_at}) => ({id, name, email, created_at, updated_at}))[0]
  }

  async getByEmail(email: string): Promise<Omit<Client, 'password'> | null> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE email = $1`, [email])
    if (result.rows.length === 0) return null

    return result.rows.map(({id, name, email, created_at, updated_at}) => ({id, name, email, created_at, updated_at}))[0]
  }

  async list(): Promise<Array<Omit<Client, 'password'>> | []> {
    const result = await pool.query(`SELECT * FROM ${this.table}`)

    if (result.rows.length === 0) return []
    return result.rows.map(({id, name, email, created_at, updated_at}) => ({id, name, email, created_at, updated_at}))
  }

  async register(client: Client): Promise<void> {
    const query = `
      INSERT INTO ${this.table} (id, name, email, password, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `
    const params = [client.id, client.name, client.email, client.password, client.created_at, client.updated_at]
    await pool.query(query, params)
  }
}
