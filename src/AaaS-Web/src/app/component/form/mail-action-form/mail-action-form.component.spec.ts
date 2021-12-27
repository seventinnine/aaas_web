import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailActionFormComponent } from './mail-action-form.component';

describe('MailActionFormComponent', () => {
  let component: MailActionFormComponent;
  let fixture: ComponentFixture<MailActionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailActionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
