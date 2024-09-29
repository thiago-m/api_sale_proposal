enum serviceType { 'por-hora', 'por-empreitada', 'outros' }

export class Service {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: string,
    public type: serviceType
  ) {}
}
