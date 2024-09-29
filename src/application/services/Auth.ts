import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from '../../domain/entities/User'
import { Auth } from '../../domain/services/Auth'

dotenv.config()

const secretKey: string = process.env.JWT_SECRET?.toString() ?? ''

export class AuthJWT implements Auth {
  generateJWT(user: User): string {
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' })
    return token
  }

  authenticateJWT(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).json({ message: 'Acesso negado. Token não fornecido.' })
    } else {
      try {
        const decoded = jwt.verify(token, secretKey)
        // @ts-ignore
        req.user = decoded
        next()
      } catch (err) {
        res.status(403).json({ message: 'Token inválido.' })
      }
    }

  }
}
