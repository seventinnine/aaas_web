import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxDetectorDetailsComponent } from './min-max-detector-details.component';

describe('MinMaxDetectorDetailsComponent', () => {
  let component: MinMaxDetectorDetailsComponent;
  let fixture: ComponentFixture<MinMaxDetectorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinMaxDetectorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxDetectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
