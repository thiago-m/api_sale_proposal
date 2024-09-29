import { v4 as uuidV4} from "uuid"
import { SaleProposalDb } from "../../../domain/entities/SaleProposal"
import { SaleProposalRepository } from "../../../domain/repositories/SaleProposalRepository"
import { SaleProposalInputDTO } from "../../../domain/services/Validator"
import { SaleProposalItemDb } from "../../../domain/entities/SaleProposalItem"
import { ProductRepository } from "../../../domain/repositories/ProductRepository"
import { ServiceRepository } from "../../../domain/repositories/ServiceRepository"
import { ClientRepository } from "../../../domain/repositories/ClientRepository"

export class RegisterSaleProposal {
  constructor(
    private saleProposalRepository: SaleProposalRepository,
    private clientRepository: ClientRepository,
    private productRepository: ProductRepository,
    private serviceRepository: ServiceRepository
  ) {}

  private countItens(saleProposalInput: SaleProposalInputDTO) {
    let count = 0
    saleProposalInput.itens.map(item => count += item.itens.length)

    return count
  }

  private async validator(saleProposalInput: SaleProposalInputDTO) {
    if(this.countItens(saleProposalInput) < 2) throw new Error('Deve ter pelo menos 2 serviços e/ou produtos')
    const services = saleProposalInput.itens.filter(item => item.type.toString() === 'service')
    const products = saleProposalInput.itens.filter(item => item.type.toString() === 'product')

    if(products.length > 1) throw new Error('Só pode ter um array de produtos')
    else if(services.length > 1) throw new Error('Só pode ter um array de serviços')

    const client = await this.clientRepository.getById(saleProposalInput.client_id)
    if (!client) throw new Error('Cliente não existe')

    if(products.length) {
      for(const productId of products[0].itens) {
        const product = await this.productRepository.getById(productId)
        if (!product) throw new Error('Serviço não existe')
      }
    }

    if(services.length) {
      for(const serviceId of services[0].itens) {
        const service = await this.serviceRepository.getById(serviceId)
        if (!service) throw new Error('Serviço não existe')
      }
    }

  }

  async execute(saleProposalInput: SaleProposalInputDTO) {
    await this.validator(saleProposalInput)

    const newSaleProposal: SaleProposalDb = new SaleProposalDb(
      uuidV4(),
      saleProposalInput.name,
      saleProposalInput.client_id,
      new Date(),
      new Date()
    )

    const newSaleProposalItem: Array<SaleProposalItemDb> = []

    for(const saleProposal of saleProposalInput.itens) {
      for(const saleProposalItem of saleProposal.itens) {
        newSaleProposalItem.push(new SaleProposalItemDb(
          uuidV4(),
          newSaleProposal.id,
          saleProposal.type,
          saleProposalItem
        ))
      }
    }

    return await this.saleProposalRepository.register(newSaleProposal, newSaleProposalItem)
  }
}

