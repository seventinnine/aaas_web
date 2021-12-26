import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHookActionDetailsComponent } from './web-hook-action-details.component';

describe('WebHookActionDetailsComponent', () => {
  let component: WebHookActionDetailsComponent;
  let fixture: ComponentFixture<WebHookActionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebHookActionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHookActionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
