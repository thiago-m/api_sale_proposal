export interface Encrypter {
  encrypt(value: string): Promise<string>
  compare(value: string, hashedValue: string): Promise<boolean>
}
