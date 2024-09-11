import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpInformationComponent } from './ip-information.component';

describe('IpInformationComponent', () => {
  let component: IpInformationComponent;
  let fixture: ComponentFixture<IpInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
