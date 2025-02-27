import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CovidDataRepository,
  HistoricalResponse,
  CountryResponse,
} from '../../domain/repositories/covid-data.repository';

@Injectable()
export class CovidApiService extends CovidDataRepository {
  private readonly baseUrl = 'https://disease.sh/v3/covid-19';

  constructor(private http: HttpClient) {
    super();
  }

  getHistoricalData(
    country: string,
    days: number
  ): Observable<HistoricalResponse> {
    const url = `${this.baseUrl}/historical/${country}?lastdays=${days}`;
    return this.http.get<HistoricalResponse>(url);
  }

  getCountries(): Observable<CountryResponse[]> {
    const url = `${this.baseUrl}/countries`;
    return this.http.get<CountryResponse[]>(url);
  }
}
