import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IpsearchboxComponent } from './iptracker/components/ipsearchbox/ipsearchbox.component';
import { IpInformationComponent } from './iptracker/components/ip-information/ip-information.component';
import { CountryinformationComponent } from './iptracker/components/countryinformation/countryinformation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    IpsearchboxComponent,
    IpInformationComponent,
    CountryinformationComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'iptracker-site';
}
