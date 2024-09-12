import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interfaces';
import { IPData } from '../interfaces/ipdata.interfaces';
import { TrackIpService } from './ip-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountrysearchService {
  public countryData!: Country;
  private apiUrl: string = 'https://restcountries.com/v3.1';

  get ipdata(): IPData {
    return this.iptracker.ipData;
  }

  constructor(private http: HttpClient, private iptracker: TrackIpService) {}

  getCountryByCode(): Observable<Country[]> {
    const countryCode = this.ipdata.location.country;
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${countryCode}`);
  }
}
