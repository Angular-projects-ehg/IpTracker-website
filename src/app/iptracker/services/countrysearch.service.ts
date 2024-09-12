import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interfaces';
import { IPData } from '../interfaces/ipdata.interfaces';
import { TrackIpService } from './ip-service.service';
import { Observable, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountrysearchService {
  public countryData: Country | null = null;  // Initialize with null
  private apiUrl: string = 'https://restcountries.com/v3.1';

  get ipdata(): IPData {
    return this.iptracker.ipData;
  }

  constructor(private http: HttpClient, private iptracker: TrackIpService) {}

  getCountryByCode(): Observable<Country[]> {
    const countryCode = this.ipdata.location.country;
    if (!countryCode) {
      console.error('Country code is not available');
      return of([]);  // Return an empty observable if no country code
    }
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${countryCode}`).pipe(
      tap((countries: Country[]) => {
        if (countries.length > 0) {
          this.countryData = countries[0];
        }
      }),
      catchError((error) => {
        console.error('Error fetching country data:', error);
        return of([]);  // Return an empty observable in case of error
      })
    );
  }
}
