import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap, filter, switchMap, startWith, catchError, of } from 'rxjs';
import { GetCovidDataUseCase } from '../../../application/usecases/get-covid-data.use-case';

interface DataRequest {
  country: string;
  period: number;
}

@Injectable()
export class DashboardView {
  private readonly request$ = new Subject<DataRequest>();
  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly data$ = this.request$.pipe(
    filter(({ country }) => !!country),
    tap(() => this.loading$.next(true)),
    switchMap(({ country, period }) =>
      this.getHistoricalData.execute(country, period).pipe(
        catchError(error => {
          console.error('Data loading error:', error);
          this.loading$.next(false);
          return of([]);
        })
      )
    ),
    tap(() => this.loading$.next(false)),
    startWith([]),
  );

  constructor(private readonly getHistoricalData: GetCovidDataUseCase) {}

  loadData = (country: string, period: number): void =>
    this.request$.next({ country, period });
}
