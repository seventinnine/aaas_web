import { TestBed } from '@angular/core/testing';

import { CanUseClientGuard } from './can-use-client.guard';

describe('CanUseClientGuard', () => {
  let guard: CanUseClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanUseClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
