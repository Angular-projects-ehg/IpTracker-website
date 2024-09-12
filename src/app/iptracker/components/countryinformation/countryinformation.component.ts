import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CountrysearchService } from '../../services/countrysearch.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-countryinformation',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './countryinformation.component.html',
  styleUrls: ['./countryinformation.component.css'],
})
export class CountryinformationComponent {
  public countryData!: Country; // To store the data from the service

  constructor(private countryService: CountrysearchService) {}

  get countrydata(): Country {
    this.countryService.getCountryByCode();

    return (this.countryData = this.countryService.countryData);
  }
}
