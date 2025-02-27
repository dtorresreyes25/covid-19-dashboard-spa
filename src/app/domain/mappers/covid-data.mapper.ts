import { CovidDataEntity } from '../entities/covid-data.entity';

interface CovidApiResponse {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

export class CovidDataMapper {
  static fromApi(response: CovidApiResponse): CovidDataEntity[] {
    const entries = Object.entries(response.cases);
    return entries.map(
      ([date, cases]) =>
        new CovidDataEntity(
          new Date(date),
          cases,
          response.deaths[date] || 0,
          response.recovered[date] || 0
        )
    );
  }
}
