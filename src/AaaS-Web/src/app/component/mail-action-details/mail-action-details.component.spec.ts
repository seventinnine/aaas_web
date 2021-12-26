import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailActionDetailsComponent } from './mail-action-details.component';

describe('MailActionDetailsComponent', () => {
  let component: MailActionDetailsComponent;
  let fixture: ComponentFixture<MailActionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailActionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailActionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
