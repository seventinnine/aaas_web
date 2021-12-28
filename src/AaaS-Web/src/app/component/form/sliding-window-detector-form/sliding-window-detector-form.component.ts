import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Detector } from 'src/app/model/detector/detector';
import { TypeChangedService } from 'src/app/service/type-changed/type-changed.service';
import { typeMustExistValidator, validAggregationOperations, validComparisonOperations } from 'src/app/validator/type-must-exist-validator';

@Component({
  selector: 'aaas-sliding-window-detector-form',
  templateUrl: './sliding-window-detector-form.component.html',
  styles: [
  ]
})
export class SlidingWindowDetectorFormComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  isActive: boolean = false;

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };

  aggregationOperations: string[] = validAggregationOperations;
  comparisonOperations: string[] = validComparisonOperations;

  constructor(
    private typeService: TypeChangedService
  ) { }
  
  ngOnInit(): void {
    this.typeService.detectorTypeChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(type => {
        if (type === 'SlidingWindowDetector') {
          if (!this.isActive) {
            this.detectorForm.get('aggregationOp')?.addValidators([Validators.required, typeMustExistValidator(validAggregationOperations)]);
            this.detectorForm.get('aggregationOp')?.updateValueAndValidity();
            this.detectorForm.get('comparisonOp')?.addValidators([Validators.required, typeMustExistValidator(validComparisonOperations)]);
            this.detectorForm.get('comparisonOp')?.updateValueAndValidity();
            this.detectorForm.get('threshold')?.addValidators([Validators.required]);
            this.detectorForm.get('threshold')?.updateValueAndValidity();
            this.isActive = true;
          } 
        } else {
          if (this.isActive) {
            this.detectorForm.get('aggregationOp')?.clearValidators();
            this.detectorForm.get('aggregationOp')?.updateValueAndValidity();
            this.detectorForm.get('comparisonOp')?.clearValidators();
            this.detectorForm.get('comparisonOp')?.updateValueAndValidity();
            this.detectorForm.get('threshold')?.clearValidators();
            this.detectorForm.get('threshold')?.updateValueAndValidity();
            this.isActive = false;
          } 
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
