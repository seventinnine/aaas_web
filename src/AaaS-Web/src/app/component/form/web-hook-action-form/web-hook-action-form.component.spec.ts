import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHookActionFormComponent } from './web-hook-action-form.component';

describe('WebHookActionFormComponent', () => {
  let component: WebHookActionFormComponent;
  let fixture: ComponentFixture<WebHookActionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebHookActionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHookActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
