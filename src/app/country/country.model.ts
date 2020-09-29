// confirmed cases stands for total cases in region

export class Country {
  constructor(
    public name: String,
    public confirmed: number,
    public deaths: number,
    public recovered: number,
    public activeCases: number,
    public lastUpdate: String
  ) {}
}