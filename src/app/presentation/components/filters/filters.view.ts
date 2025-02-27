import { Observable, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { GetCountriesUseCase } from '../../../application/usecases/get-countries.use-case';
import { CountryEntity } from '../../../domain/entities/country.entity';

@Injectable()
export class FiltersView {
  readonly countries$: Observable<CountryEntity[]>;

  constructor(private readonly getCountriesUseCase: GetCountriesUseCase) {
    this.countries$ = this.getCountriesUseCase.execute().pipe(
      shareReplay(1)
    );
  }
}
