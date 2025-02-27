import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CovidDataRepository } from './domain/repositories/covid-data.repository';
import { CovidApiService } from './infrastructure/services/covid-api.service';
import { GetCountriesUseCase } from './application/usecases/get-countries.use-case';
import {GetCovidDataUseCase} from './application/usecases/get-covid-data.use-case';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    CovidApiService,
    { provide: CovidDataRepository, useExisting: CovidApiService },
    GetCountriesUseCase,
    GetCovidDataUseCase,
  ]
};
