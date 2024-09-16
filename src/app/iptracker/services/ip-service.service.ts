import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { IPData } from '../interfaces/ipdata.interfaces';
import { CountrysearchService } from './countrysearch.service';  // Import the service
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class TrackIpService {
  public isLoading: boolean = false;
  private map: L.Map | null = null;
  public ipData: IPData = {
    ip: '',
    location: {
      postalCode: '',
      country: '',
      region: '',
      timezone: '',
      lng: 0,
      lat: 0,
      city: ''
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

  private IP_API_KEY = 'at_BrcveaLbj7lSYubmEPCIa33zefqUS';
  private API_URL: string = 'https://geo.ipify.org/api/v2/country,city';
  private GET_IP_URL: string = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient, private countryService: CountrysearchService) {}

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
      tap((resp) => {
        this.ipData = resp;
        this.initMap();
        console.log(this.ipData);
        this.isLoading = false;

        // Call getCountryByCode after updating ipData
        const countryCode = this.ipData.location.country;
        this.countryService.getCountryByCode(countryCode).subscribe(
          (countries) => {
            console.log('Country data updated:', countries);
          },
          (error) => {
            console.error('Error fetching country data:', error);
          }
        );
      }),
      catchError((error) => {
        console.error('Error fetching IP data:', error);
        this.isLoading = false;
        return of(this.ipData);
      })
    );
  }

  private initMap(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [this.ipData.location.lat, this.ipData.location.lng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap',
      }
    );
    tiles.addTo(this.map);

    const marker = L.marker([
      this.ipData.location.lat,
      this.ipData.location.lng,
    ]);
    marker.addTo(this.map);
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
