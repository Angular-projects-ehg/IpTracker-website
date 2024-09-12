import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TrackIpService } from '../../services/ip-service.service';
import { IPData } from '../../interfaces/ipdata.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ipsearchbox',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './ipsearchbox.component.html',
  styleUrl: './ipsearchbox.component.css',
})
export class IpsearchboxComponent {

  public ipSearchForm: FormGroup;

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
      city: '',
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

  constructor(private ipservice: TrackIpService , private fb:FormBuilder) {
    this.ipSearchForm = this.fb.group({
      ipaddress:['', [Validators.required]]
    })
  }

  isValidField(field:string):boolean | null {
    return this.ipSearchForm.controls[field].errors
    && this.ipSearchForm.controls[field].touched;
  }

  getFieldError(field: string):string | null {
    if(!this.ipSearchForm.controls[field]) return null;

    const errors = this.ipSearchForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Ip Address Field is required.';
      }
    }

    return null;

  }


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

    if(this.ipSearchForm.invalid){
      this.ipSearchForm.markAllAsTouched();
      return;
    }


    const IP = this.searchIp.nativeElement.value;

    this.ipservice.searchIp(IP).subscribe((data) => {
      this.ipdata = data;
    });
  }
}
