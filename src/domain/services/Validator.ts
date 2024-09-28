export interface ClientInputDTO {
  name: string
  email: string
  password: string
  repeat_password: string
}

export interface Validator {
  normalizeInput(clientInput: ClientInputDTO): ClientInputDTO
  ClientValidateInput(clientInput: ClientInputDTO): Promise<void>
}
