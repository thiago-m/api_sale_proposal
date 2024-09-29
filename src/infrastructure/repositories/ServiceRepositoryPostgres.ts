import pool from '../database/PostgreSQL'
import { Service } from '../../domain/entities/Service'
import { ServiceRepository } from '../../domain/repositories/ServiceRepository'

export class ServiceRepositoryPostgres implements ServiceRepository {
  private readonly table = 'services'

  async getByName(name: string): Promise<Service | null> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [name])
    if (result.rows.length === 0) return null

    return result.rows[0]
  }

  async list(): Promise<Array<Service> | []> {
    const result = await pool.query(`SELECT * FROM ${this.table}`)
    if (result.rows.length === 0) return []

    return result.rows
  }

  async register(service: Service): Promise<void> {
    const query = `
      INSERT INTO ${this.table} (id, name, description, price, type)
      VALUES ($1, $2, $3, $4, $5)
    `
    const params = [service.id, service.name, service.description, service.price, service.type]
    await pool.query(query, params)
  }
}
