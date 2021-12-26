import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppkeySelectComponent } from './appkey-select.component';

describe('AppkeySelectComponent', () => {
  let component: AppkeySelectComponent;
  let fixture: ComponentFixture<AppkeySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppkeySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppkeySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
