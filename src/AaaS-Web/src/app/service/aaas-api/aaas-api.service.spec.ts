import { TestBed } from '@angular/core/testing';

import { AaasApiService } from './aaas-api.service';

describe('AaasApiService', () => {
  let service: AaasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AaasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
