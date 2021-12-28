import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Detector } from 'src/app/model/detector/detector';
import { TypeChangedService } from 'src/app/service/type-changed/type-changed.service';
import { CheckIfMinValueNotLargerThanMaxValue } from 'src/app/validator/validators';

@Component({
  selector: 'aaas-min-max-detector-form',
  templateUrl: './min-max-detector-form.component.html',
  styles: [
  ]
})
export class MinMaxDetectorFormComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<void> = new Subject<void>();
  isActive: boolean = false;

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };

  constructor(
    private typeService: TypeChangedService
  ) { }
  
  ngOnInit(): void {
    this.typeService.detectorTypeChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(type => {
        if (type === 'MinMaxDetector') {
          if (!this.isActive) {
            this.detectorForm.get('minValue')?.addValidators([Validators.required]);
            this.detectorForm.get('minValue')?.updateValueAndValidity();
            this.detectorForm.get('maxValue')?.addValidators([Validators.required]);
            this.detectorForm.get('maxValue')?.updateValueAndValidity();
            this.detectorForm.get('outlierCount')?.addValidators([Validators.required, Validators.min(0)]);
            this.detectorForm.get('outlierCount')?.updateValueAndValidity();
            this.detectorForm.addValidators(CheckIfMinValueNotLargerThanMaxValue);
            this.isActive = true;
          } 
        } else {
          if (this.isActive) {
            this.detectorForm.get('minValue')?.clearValidators();
            this.detectorForm.get('minValue')?.updateValueAndValidity();
            this.detectorForm.get('maxValue')?.clearValidators();
            this.detectorForm.get('maxValue')?.updateValueAndValidity();
            this.detectorForm.get('outlierCount')?.clearValidators();
            this.detectorForm.get('outlierCount')?.updateValueAndValidity();
            this.detectorForm.removeValidators(CheckIfMinValueNotLargerThanMaxValue);
            this.isActive = false;
          } 
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
  
}
