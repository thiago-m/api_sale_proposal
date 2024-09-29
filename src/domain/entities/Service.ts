export enum serviceType { 'por hora', 'por empreitada', 'outros' }

export class Service {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public type: serviceType,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
