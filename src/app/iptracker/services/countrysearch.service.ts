import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interfaces';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountrysearchService {
  public countryData: Country | null = null;
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getCountryByCode(countryCode: string): Observable<Country[]> {
    if (!countryCode) {
      return of([]);
    }
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${countryCode}`).pipe(
      tap((countries: Country[]) => {
        if (countries.length > 0) {
          this.countryData = countries[0];
        }
      }),
      catchError((error) => {
        console.error('Error fetching country data:', error);
        return of([]);
      })
    );
  }
}
