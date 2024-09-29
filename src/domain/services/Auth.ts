import { Request, Response, NextFunction } from 'express'
import { User } from '../entities/User'

export interface Auth {
  authenticateJWT(req: Request, res: Response, next: NextFunction): void
  generateJWT(user: User): string
}
