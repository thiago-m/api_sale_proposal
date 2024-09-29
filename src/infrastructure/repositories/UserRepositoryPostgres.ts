import pool from '../database/PostgreSQL'
import { User } from '../../domain/entities/User'
import { UserRepository } from '../../domain/repositories/UserRepository'

export class UserRepositoryPostgres implements UserRepository {
  private readonly table = 'users'

  async getByEmail(email: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE email = $1`, [email])
    if (result.rows.length === 0) return null

    return result.rows[0]
  }
}
