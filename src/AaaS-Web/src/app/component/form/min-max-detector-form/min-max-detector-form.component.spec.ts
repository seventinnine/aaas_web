import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxDetectorFormComponent } from './min-max-detector-form.component';

describe('MinMaxDetectorFormComponent', () => {
  let component: MinMaxDetectorFormComponent;
  let fixture: ComponentFixture<MinMaxDetectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinMaxDetectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxDetectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
