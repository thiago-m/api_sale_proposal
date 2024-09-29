import { Request, Response } from "express"
import { LoginUser } from "../application/use-cases/users/LoginUser"
import { UserRepositoryPostgres } from "../infrastructure/repositories/UserRepositoryPostgres"
import { BcryptEncrypter } from "../application/services/Encrypter"
import { AuthJWT } from "../application/services/Auth"

export class UserController {
  private LoginUser: LoginUser

  constructor() {
    this.LoginUser = new LoginUser(new UserRepositoryPostgres, new BcryptEncrypter, new AuthJWT)
  }

  async LoginUserController(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await this.LoginUser.execute(email, password)
      res.json(user)
    } catch (error: any) {
      console.log('error', error)
      res.status(404).json({ message: error?.message || 'Erro desconhecido' })
    }
  }
}
