import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TypeChangedService } from 'src/app/service/type-changed/type-changed.service';

@Component({
  selector: 'aaas-web-hook-action-form',
  templateUrl: './web-hook-action-form.component.html',
  styles: [
  ]
})
export class WebHookActionFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  isActive: boolean = false;

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };

  constructor(
    private typeService: TypeChangedService
  ) { }
  
  ngOnInit(): void {
    this.typeService.actionTypeChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(type => {
        if (type === 'WebHookAction') {
          if (!this.isActive) {
            this.detectorForm.get('httpAddress')?.addValidators([Validators.required]);
            this.detectorForm.get('httpAddress')?.updateValueAndValidity();
            this.isActive = true;
          } 
        } else {
          if (this.isActive) {
            this.detectorForm.get('httpAddress')?.clearValidators();
            this.detectorForm.get('httpAddress')?.updateValueAndValidity();
            this.isActive = false;
          } 
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
