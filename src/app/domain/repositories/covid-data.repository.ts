import { Observable } from 'rxjs';

export interface HistoricalResponse {
  timeline: {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
  };
}

export interface CountryResponse {
  country: string;
  countryInfo: {
    iso3: string;
    flag: string;
  };
}

export abstract class CovidDataRepository {
  abstract getHistoricalData(country: string, days: number): Observable<HistoricalResponse>;
  abstract getCountries(): Observable<CountryResponse[]>;
}
