import * as Yup from 'yup'
import { ClientInput } from "../dtos/ClientInput"
import { Validator } from '../../domain/services/Validator'

export class YupValidator implements Validator {
  normalizeInput(clientInput: ClientInput): ClientInput {
    return {
      ...clientInput,
      name: clientInput.name.trim(),
      email: clientInput.email.trim().toLowerCase(),
    }
  }

  async ClientValidateInput(clientInput: ClientInput): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .min(3, 'Name must be at least 3 characters long')
        .max(30, 'Name can be at most 30 characters long')
        .required('Name is required'),
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      repeat_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Repeat password is required'),
    })

    try { await schema.validate(this.normalizeInput(clientInput)) }
    catch (error) {
      console.log('error in validate client data', error)
      throw new Error('Error in validate client data')
    }
  }
}
