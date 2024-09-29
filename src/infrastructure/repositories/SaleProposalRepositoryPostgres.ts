import pool from '../database/PostgreSQL'
import { SaleProposalDb, SaleProposalReturn } from '../../domain/entities/SaleProposal'
import { SaleProposalItemDb } from '../../domain/entities/SaleProposalItem'
import { SaleProposalRepository } from '../../domain/repositories/SaleProposalRepository'

export class SaleProposalRepositoryPostgres implements SaleProposalRepository {

  async getById (saleProposalId: string): Promise<SaleProposalReturn | null> {
    const query = `
      SELECT
        sp.id AS sale_proposal_id,
        sp.name AS sale_proposal_name,
        sp.created_at AS sale_proposal_created_at,
        sp.updated_at AS sale_proposal_updated_at,
        c.id AS client_id,
        c.name AS client_name,
        c.email AS client_email,
        spi.type AS item_type,
        p.id AS product_id,
        p.name AS product_name,
        s.id AS service_id,
        s.name AS service_name
      FROM
        sale_proposal sp
      JOIN
        clients c ON sp.client_id = c.id
      LEFT JOIN
        sale_proposal_item spi ON sp.id = spi.sale_proposal_id
      LEFT JOIN
        products p ON spi.product_id = p.id
      LEFT JOIN
        services s ON spi.service_id = s.id
      WHERE
        sp.id = $1
    `

    const result = await pool.query(query, [saleProposalId])

    // Organizar os dados no formato desejado
    if (result.rows.length === 0) return null

    const saleProposal = {
      id: result.rows[0].sale_proposal_id,
      name: result.rows[0].sale_proposal_name,
      client: {
        id: result.rows[0].client_id,
        name: result.rows[0].client_name,
        email: result.rows[0].client_email
      },
      services: [],
      products: []
    }

    result.rows.forEach(row => {
      if (row.service_id) {
        // @ts-ignore
        saleProposal.services.push({
          id: row.service_id,
          name: row.service_name
        })
      } else if (row.product_id) {
        // @ts-ignore
        saleProposal.products.push({
          id: row.product_id,
          name: row.product_name
        })
      }
    })

    return saleProposal
  }

  async list(): Promise<Array<SaleProposalReturn> | []> {
    const query = `
      SELECT
        sp.id AS sale_proposal_id,
        sp.name AS sale_proposal_name,
        sp.created_at AS sale_proposal_created_at,
        sp.updated_at AS sale_proposal_updated_at,
        c.id AS client_id,
        c.name AS client_name,
        c.email AS client_email,
        spi.type AS item_type,
        p.id AS product_id,
        p.name AS product_name,
        s.id AS service_id,
        s.name AS service_name
      FROM
        sale_proposal sp
      JOIN
        clients c ON sp.client_id = c.id
      LEFT JOIN
        sale_proposal_item spi ON sp.id = spi.sale_proposal_id
      LEFT JOIN
        products p ON spi.product_id = p.id
      LEFT JOIN
        services s ON spi.service_id = s.id
    `

    const result = await pool.query(query)

    const saleProposals = {}

    // Organizar os dados no formato desejado
    result.rows.forEach(row => {
      // @ts-ignore
      if (!saleProposals[row.sale_proposal_id]) {
        // @ts-ignore
        saleProposals[row.sale_proposal_id] = {
          id: row.sale_proposal_id,
          name: row.sale_proposal_name,
          created_at: row.sale_proposal_created_at,
          updated_at: row.sale_proposal_updated_at,
          client: {
            id: row.client_id,
            name: row.client_name,
            email: row.client_email
          },
          services: [],
          products: []
        }
      }

        // @ts-ignore
      const saleProposal = saleProposals[row.sale_proposal_id]

      if (row.service_id) {
        saleProposal.services.push({
          id: row.service_id,
          name: row.service_name
        })
      }
      if (row.product_id) {
        saleProposal.products.push({
          id: row.product_id,
          name: row.product_name
        })
      }
    })

    return Object.values(saleProposals)
  }

  async register(saleProposal: SaleProposalDb, saleProposalItems: Array<SaleProposalItemDb>): Promise<void> {
    const registreSaleProposal = async (saleProposal: SaleProposalDb) => {
      const query = `
        INSERT INTO sale_proposal (id, name, client_id)
        VALUES ($1, $2, $3)
      `
      const params = [saleProposal.id, saleProposal.name, saleProposal.client_id]
      await pool.query(query, params)

    }

    const registreSaleProposalItem = async (saleProposalId: string, saleProposalItem: SaleProposalItemDb) => {
      const fk = saleProposalItem.type.toString() === 'service' ? 'service_id' : 'product_id'
      const query = `
        INSERT INTO sale_proposal_item (id, sale_proposal_id, type, ${fk})
        VALUES ($1, $2, $3, $4)
      `
      const params = [ saleProposalItem.id, saleProposalId, saleProposalItem.type, saleProposalItem.item_id ]
      await pool.query(query, params)
    }

    await registreSaleProposal(saleProposal)
    for(const saleProposalItem of saleProposalItems) {
      await registreSaleProposalItem(saleProposal.id, saleProposalItem)
    }
  }
}

