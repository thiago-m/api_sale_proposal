import pool from '../database/PostgreSQL'
import { Product } from '../../domain/entities/Product'
import { ProductRepository } from '../../domain/repositories/ProductRepository'

export class ProductRepositoryPostgres implements ProductRepository {
  private readonly table = 'products'

  async getByName(name: string): Promise<Product | null> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE name = $1`, [name])
    if (result.rows.length === 0) return null

    return result.rows[0]
  }

  async list(): Promise<Array<Product> | []> {
    const result = await pool.query(`SELECT * FROM ${this.table}`)
    if (result.rows.length === 0) return []

    return result.rows
  }

  async register(product: Product): Promise<void> {
    const query = `
      INSERT INTO ${this.table} (id, name, description, price, type)
      VALUES ($1, $2, $3, $4, $5)
    `
    const params = [product.id, product.name, product.description, product.price, product.type]
    await pool.query(query, params)
  }
}
