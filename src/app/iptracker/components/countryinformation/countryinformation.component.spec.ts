import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryinformationComponent } from './countryinformation.component';

describe('CountryinformationComponent', () => {
  let component: CountryinformationComponent;
  let fixture: ComponentFixture<CountryinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
