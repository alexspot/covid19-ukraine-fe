export class City {
  // confirmed cases stands for total cases in region
  constructor(
    public title: String,
    public locationFull: String,
    public confirmed: number,
    public deaths: number,
    public recovered: number,
    public activeCases: number,
    public lastUpdate: String,
  ) {}
}