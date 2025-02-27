import { CountryEntity } from '../entities/contry.entity';
import {CountryResponse} from '../repositories/covid-data.repository';

export class CountryMapper {
  static fromApi(response: CountryResponse): CountryEntity {
    return new CountryEntity(response.countryInfo.iso3, response.country);
  }
}
