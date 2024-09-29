export enum productType { 'novo', 'usado', 'comestível' }

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public type: productType,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
