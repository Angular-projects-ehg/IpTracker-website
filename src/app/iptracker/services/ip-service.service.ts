import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { IPData } from '../interfaces/ipdata.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TrackIpService {
  public isLoading: boolean = false;
  public ipData: IPData = {
    ip: '',
    location: {
      postalCode: '',
      country: '',
      region: '',
      timezone: '',
      lng: 0,
      lat: 0,
      city:''
    },
    domains: [],
    as: {
      asn: 0,
      name: '',
      route: '',
      domain: '',
      type: '',
    },
    isp: '',
  };

  private IP_API_KEY = 'at_hPAACjBFXwBiHiCeOja5JElbVvFTU';
  private API_URL: string = 'https://geo.ipify.org/api/v2/country,city';
  private GET_IP_URL: string = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient) {}


  public searchIp(ip: string): Observable<IPData> {
    this.isLoading = true;
    if (ip.length === 0) {
      this.isLoading = false;
      return of(this.ipData);
    }

    const params = new HttpParams()
      .set('apiKey', this.IP_API_KEY)
      .set('ipAddress', ip);

    return this.http.get<IPData>(this.API_URL, { params }).pipe(
      // delay(1000),
      tap((resp) => {
        this.ipData = resp;
        console.log(this.ipData)
        this.isLoading = false;
      }),
      catchError((error) => {
        console.error('Error fetching IP data:', error);
        this.isLoading = false;
        return of(this.ipData);
      })
    );
  }


  public getMyIpAndSearch(): Observable<IPData> {
    return this.http.get<{ ip: string }>(this.GET_IP_URL).pipe(
      switchMap((data) => this.searchIp(data.ip)),
      catchError((error) => {
        console.error('Error fetching public IP:', error);
        return of(this.ipData);
      })
    );
  }
}
