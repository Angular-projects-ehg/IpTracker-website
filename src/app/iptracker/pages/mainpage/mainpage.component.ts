import { Component } from '@angular/core';
import { IpsearchboxComponent } from '../../components/ipsearchbox/ipsearchbox.component';
import { IpInformationComponent } from '../../components/ip-information/ip-information.component';
import { CountryinformationComponent } from '../../components/countryinformation/countryinformation.component';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [IpsearchboxComponent,IpInformationComponent,CountryinformationComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {

}
