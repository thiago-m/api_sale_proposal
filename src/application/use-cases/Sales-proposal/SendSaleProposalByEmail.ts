import AWS from 'aws-sdk'

export class SendSaleProposal {
  constructor(private ses: AWS.SES) {}

  async execute(saleProposal: any) {
    type serviceProduct = { id: string, name: string }

    const body = `
      Olá ${saleProposal.client.name}
      Venho através desse email te passar as informações referentes aos serviços/produtos da nossa proposta de venda
      Serviços: ${ saleProposal.services.map((service: serviceProduct) => service.name).toString().replaceAll(',', ', ') }
      Produtos: ${ saleProposal.products.map((product: serviceProduct) => product.name).toString().replaceAll(',', ', ') }
    `
    const params = {
      Source: 'thiagomarciel.dev@gmail.com',
      Destination: {
        ToAddresses: [saleProposal.client.email],
      },
      Message: {
        Subject: {
          Data: saleProposal.name,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: body,
            Charset: 'UTF-8',
          },
        },
      },
    }

    try {
      await this.ses.sendEmail(params).promise()
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      throw new Error('Erro ao enviar email')
    }
  }
}
