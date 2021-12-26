import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorDeletionComponent } from './detector-deletion.component';

describe('DetectorDeletionComponent', () => {
  let component: DetectorDeletionComponent;
  let fixture: ComponentFixture<DetectorDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
