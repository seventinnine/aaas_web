import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorOverviewComponent } from './detector-overview.component';

describe('DetectorOverviewComponent', () => {
  let component: DetectorOverviewComponent;
  let fixture: ComponentFixture<DetectorOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
