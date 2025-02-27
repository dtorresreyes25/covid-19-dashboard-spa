export class CovidDataEntity {
  constructor(
    public date: Date,
    public cases: number,
    public deaths: number,
    public recovered: number
  ) {}
}
