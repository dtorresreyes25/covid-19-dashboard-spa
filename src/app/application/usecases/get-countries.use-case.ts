import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CovidDataRepository } from '../../domain/repositories/covid-data.repository';
import { CountryEntity } from '../../domain/entities/contry.entity';
import { CountryMapper } from '../../domain/mappers/country.mapper';

@Injectable()
export class GetCountriesUseCase {
  constructor(private readonly repository: CovidDataRepository) {}

  execute(): Observable<CountryEntity[]> {
    return this.repository
      .getCountries()
      .pipe(
        map((countries) =>
          countries.map((country) => CountryMapper.fromApi(country))
        )
      );
  }
}
