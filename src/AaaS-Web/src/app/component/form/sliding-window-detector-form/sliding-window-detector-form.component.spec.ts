import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingWindowDetectorFormComponent } from './sliding-window-detector-form.component';

describe('SlidingWindowDetectorFormComponent', () => {
  let component: SlidingWindowDetectorFormComponent;
  let fixture: ComponentFixture<SlidingWindowDetectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidingWindowDetectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingWindowDetectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
