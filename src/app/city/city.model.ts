// confirmed cases stands for total cases in region

export class City {
  constructor(
    public title: String,
    public locationFull: String,
    public confirmed: number,
    public deaths: number,
    public recovered: number,
    public activeCases: number,
    public lastUpdate: String
  ) {}
}