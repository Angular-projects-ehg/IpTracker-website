import { Component, Input, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { IPData } from '../../interfaces/ipdata.interfaces'
import { TrackIpService } from '../../services/ip-service.service';
@Component({
  selector: 'app-ip-information',
  standalone: true,
  imports: [MatListModule, MatDividerModule],
  templateUrl: './ip-information.component.html',
  styleUrl: './ip-information.component.css'
})
export class IpInformationComponent{


 constructor(private iptracker:TrackIpService) {}

get ipdata():IPData {
  return this.iptracker.ipData;
}

}








