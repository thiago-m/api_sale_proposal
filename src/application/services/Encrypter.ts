import * as bcrypt from 'bcrypt'
import { Encrypter } from '../../domain/services/Encrypter'

export class BcryptEncrypter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(value, salt)
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue)
  }
}
