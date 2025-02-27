import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CovidDataRepository } from '../../domain/repositories/covid-data.repository';
import { CovidDataEntity } from '../../domain/entities/covid-data.entity';
import { CovidDataMapper } from '../../domain/mappers/covid-data.mapper';

@Injectable({
  providedIn: 'root',
})
export class GetCovidDataUseCase {
  constructor(private repository: CovidDataRepository) {}

  execute(country: string, days: number): Observable<CovidDataEntity[]> {
    return this.repository
      .getHistoricalData(country, days)
      .pipe(map((data) => CovidDataMapper.fromApi(data.timeline)));
  }
}
