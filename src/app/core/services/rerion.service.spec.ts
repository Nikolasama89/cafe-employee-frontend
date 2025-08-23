import { TestBed } from '@angular/core/testing';

import { RerionService } from './rerion.service';

describe('RerionService', () => {
  let service: RerionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RerionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
