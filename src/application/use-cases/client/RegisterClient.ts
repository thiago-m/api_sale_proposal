import { v4 as uuidV4} from "uuid"
import { Client } from "../../../domain/entities/Client"
import { ClientRepository } from "../../../domain/repositories/ClientRepository"
import { Validator, ClientInputDTO } from "../../../domain/services/Validator"
import { Encrypter } from "../../../domain/services/Encrypter"

export class RegisterClient {
  constructor(
    private clientRepository: ClientRepository,
    private validator: Validator,
    private encrypter: Encrypter,
  ) {}

  async execute(clientInput: ClientInputDTO) {
    this.validator.ClientValidateInput(clientInput)

    const existClient = await this.clientRepository.getByEmail(clientInput.email)
    if(existClient) throw new Error('Client already exists')

    const hashedPassword = await this.encrypter.encrypt(clientInput.password)

    const newClient: Client = new Client(
      uuidV4(),
      clientInput.name,
      clientInput.email,
      hashedPassword,
      new Date(),
      new Date()
    )

    return await this.clientRepository.register(newClient)
  }
}

