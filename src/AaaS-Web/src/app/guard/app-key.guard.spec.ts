import { TestBed } from '@angular/core/testing';

import { AppKeyGuard } from './app-key.guard';

describe('AppKeyGuard', () => {
  let guard: AppKeyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppKeyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
