import { TestBed } from '@angular/core/testing';

import { CountrysearchService } from './countrysearch.service';

describe('CountrysearchService', () => {
  let service: CountrysearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountrysearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
