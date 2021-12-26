import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorFormComponent } from './detector-form.component';

describe('DetectorFormComponent', () => {
  let component: DetectorFormComponent;
  let fixture: ComponentFixture<DetectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
