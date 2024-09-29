import { v4 as uuidV4} from "uuid"
import { Product } from "../../../domain/entities/Product"
import { ProductRepository } from "../../../domain/repositories/ProductRepository"
import { Validator, ProductInputDTO } from "../../../domain/services/Validator"

export class RegisterProduct {
  constructor(
    private productRepository: ProductRepository,
    private validator: Validator,
  ) {}

  async execute(productInput: ProductInputDTO) {
    await this.validator.ProductValidateInput(productInput)

    const existProduct = await this.productRepository.getByName(productInput.name)
    if(existProduct) throw new Error('Product already exists')

    const newProduct: Product = new Product(
      uuidV4(),
      productInput.name,
      productInput.description,
      productInput.price,
      productInput.type,
      new Date(),
      new Date()
    )

    return await this.productRepository.register(newProduct)
  }
}

