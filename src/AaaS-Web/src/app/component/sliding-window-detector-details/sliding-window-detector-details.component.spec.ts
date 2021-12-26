import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingWindowDetectorDetailsComponent } from './sliding-window-detector-details.component';

describe('SlidingWindowDetectorDetailsComponent', () => {
  let component: SlidingWindowDetectorDetailsComponent;
  let fixture: ComponentFixture<SlidingWindowDetectorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidingWindowDetectorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingWindowDetectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
