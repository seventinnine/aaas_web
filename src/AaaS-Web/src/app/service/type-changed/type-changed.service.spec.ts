import { TestBed } from '@angular/core/testing';

import { TypeChangedService } from './type-changed.service';

describe('TypeChangedService', () => {
  let service: TypeChangedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.injectTypeChangedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
