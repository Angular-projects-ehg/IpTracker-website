import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CountrysearchService } from '../../services/countrysearch.service';
import { Country } from '../../interfaces/country.interfaces';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-countryinformation',
  standalone: true,
  imports: [MatListModule,CommonModule],
  templateUrl: './countryinformation.component.html',
  styleUrls: ['./countryinformation.component.css'],
})
export class CountryinformationComponent implements OnInit {

  constructor(private countryService: CountrysearchService) {}

  // Accessing country data via the service
  get countrydata(): Country | null {
    return this.countryService.countryData;
  }

  // Fetch country data on initialization
  ngOnInit(): void {
    setTimeout(() => {
      this.countryService.getCountryByCode().subscribe({
        next: (countries: Country[]) => {
          console.log('Datos del país cargados:', countries);
        },
        error: (error) => {
          console.error('Error al obtener datos del país:', error);
        }
      });

    }, 500);
  }
}
