import { ProductRepository } from "../../../domain/repositories/ProductRepository"

export class ListProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    const product = await this.productRepository.list()
    return product ?? []
  }
}
