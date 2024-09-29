import { v4 as uuidV4} from "uuid"
import { Service } from "../../../domain/entities/Service"
import { ServiceRepository } from "../../../domain/repositories/ServiceRepository"
import { Validator, ServiceInputDTO } from "../../../domain/services/Validator"

export class RegisterService {
  constructor(
    private serviceRepository: ServiceRepository,
    private validator: Validator,
  ) {}

  async execute(serviceInput: ServiceInputDTO) {
    await this.validator.ServiceValidateInput(serviceInput)

    const existService = await this.serviceRepository.getByName(serviceInput.name)
    if(existService) throw new Error('Service already exists')

    const newService: Service = new Service(
      uuidV4(),
      serviceInput.name,
      serviceInput.description,
      serviceInput.price,
      serviceInput.type,
      new Date(),
      new Date()
    )

    return await this.serviceRepository.register(newService)
  }
}

