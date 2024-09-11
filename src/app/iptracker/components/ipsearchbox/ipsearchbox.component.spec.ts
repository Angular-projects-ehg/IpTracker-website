import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpsearchboxComponent } from './ipsearchbox.component';

describe('IpsearchboxComponent', () => {
  let component: IpsearchboxComponent;
  let fixture: ComponentFixture<IpsearchboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpsearchboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpsearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
