import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TrackIpService } from '../../services/ip-service.service';
import { IPData } from '../../interfaces/ipdata.interfaces';

@Component({
  selector: 'app-ipsearchbox',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './ipsearchbox.component.html',
  styleUrl: './ipsearchbox.component.css',
})
export class IpsearchboxComponent implements OnInit {
  @ViewChild('ipValueInput')
  public searchIp!: ElementRef<HTMLInputElement>;

  public ipdata: IPData = {
    ip: '',
    location: {
      postalCode: '',
      country: '',
      region: '',
      timezone: '',
      lng: 0,
      lat: 0,
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

  constructor(private ipservice: TrackIpService) {}

  ngOnInit(): void {
    this.ipservice.getMyIpAndSearch().subscribe((data: IPData) => {
      this.ipdata = data;
      if (this.searchIp) {
        this.searchIp.nativeElement.value = this.ipdata.ip;
      }
    });
  }

  FormSubmit(e: Event): void {
    e.preventDefault();

    const IP = this.searchIp.nativeElement.value;

    this.ipservice.searchIp(IP).subscribe((data) => {
      console.log(data);
      this.ipdata = data;
    });

    console.log('Searching IP: ' + IP);
    console.log('Searching IP: ' + this.ipdata);
  }
}
