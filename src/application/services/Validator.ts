import * as Yup from 'yup'
import { ClientInput } from "../dtos/ClientInput"
import { ProductInput } from '../dtos/ProductInput'
import { Validator } from '../../domain/services/Validator'

export class YupValidator implements Validator {
  normalizeInput(input: ClientInput): ClientInput {
    return {
      ...input,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    }
  }

  async ClientValidateInput(clientInput: ClientInput): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'O nome só pode ter letras e espaços')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(30, 'O nome deve ter no máximo 30 caracteres')
        .required('O nome é obrigatório'),
      email: Yup.string()
        .email('Email inválido')
        .required('O Email é obrigatório'),
      password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('A senha é obrigatória'),
      repeat_password: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não são iguais')
        .required('Repetir a senha é obrigatório'),
    })

    try { await schema.validate(this.normalizeInput(clientInput)) }
    catch (error) {
      console.log('error in validate client data', error)
      throw new Error('Erro em validar dados do cliente')
    }
  }

  async ProductValidateInput(productInput: ProductInput): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'O nome só pode ter letras e espaços')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(30, 'O nome deve ter no máximo 30 caracteres')
        .required('O nome é obrigatório'),
      description: Yup.string()
        .min(3, 'A descrição deve ter pelo menos 3 caracteres')
        .max(250, 'A descrição deve ter no máximo 250 caracteres')
        .required('A descrição é obrigatória'),
      price: Yup.number()
        .positive('O preço deve ser positivo')
        .required('O preço é obrigatório'),
      type: Yup.mixed().oneOf(['novo', 'usado', 'comestível'])
        .required('O tipo de produto é obrigatório')
    })

    try { await schema.validate(productInput) }
    catch (error) {
      console.log('error in validate product data', error)
      throw new Error('Erro em validar dados do produto')
    }
  }


}
