import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Detector } from 'src/app/model/detector/detector';
import { TypeChangedService } from 'src/app/service/type-changed/type-changed.service';

@Component({
  selector: 'aaas-mail-action-form',
  templateUrl: './mail-action-form.component.html',
  styles: [
  ]
})
export class MailActionFormComponent implements OnInit, OnDestroy {

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
        console.log("actionChild");
        if (type === 'MailAction') {
          if (!this.isActive) {
            this.detectorForm.get('email')?.addValidators([Validators.required, Validators.email]);
            this.detectorForm.get('email')?.updateValueAndValidity();
            this.isActive = true;
          } 
        } else {
          if (this.isActive) {
            this.detectorForm.get('email')?.clearValidators();
            this.detectorForm.get('email')?.updateValueAndValidity();
            this.isActive = false;
          } 
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
