import { UserRepository } from "../../../domain/repositories/UserRepository"
import { Auth } from "../../../domain/services/Auth"
import { Encrypter } from "../../../domain/services/Encrypter"

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter,
    private auth: Auth
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email)
    if(!user) throw new Error('User not found')

    const passwordEqual = await this.encrypter.compare(password, user?.password ?? '')
    const token = await this.auth.generateJWT(user)

    if (!passwordEqual) throw new Error('User not found')
    return {
      user,
      token
    }
  }
}
