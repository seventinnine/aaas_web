import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Detector } from 'src/app/model/detector/detector';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { getHours, getMinutes, getSeconds, removeUndefinedAndNull, toExecutionInterval } from 'src/app/util/utils';
import { TotalDurationMoreThanOneSecond } from 'src/app/validator/validators';
import { wordToComparisonOperation, typeMustExistValidator, validActionTypes, validDetectorTypes, comparisonOperationToWord } from 'src/app/validator/type-must-exist-validator';
import { environment } from 'src/environments/environment';
import { DetectorFormErrorMessages } from './detector-form-error-messages';
import { Action } from 'src/app/model/action/action';
import { TypeChangedService } from 'src/app/service/type-changed/type-changed.service';

@Component({
  selector: 'aaas-detector-form',
  templateUrl: './detector-form.component.html',
  styles: [
  ]
})
export class DetectorFormComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<void> = new Subject<void>();
  
  isUpdatingDetector: boolean = false;
  detectorForm!: FormGroup;
  detector: Detector = new Detector();
  detectorTypes = validDetectorTypes;
  actionTypes = validActionTypes;
  errors: { [key: string]: string } = {};
  formInitialized: boolean = false;
  errorOccurred: boolean = false;
  sendingFailed: boolean = false;
  alreadyExists: boolean = false;
  foundDetectorId: number = 0;

  selectedDetectorType: string = "";
  selectedActionType: string = "";
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: AaasApiService,
    private typeService: TypeChangedService
  ) { }

  ngOnInit(): void {
    this.detector.appKey = this.apiService.getCurrentAppKey();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingDetector = true;
      this.apiService.getDetectorById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res != null) {
          this.detector = res;
          this.detector.actionType = this.detector.action?.type ?? "";
          this.selectedDetectorType = res.type!;
          this.selectedActionType = res.action!.type!;
          this.initForm();
        } else {
          this.errorOccurred = true;
        }
      })
    } else {
      this.initForm();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  initForm() {
    this.detectorForm = this.fb.group({
      appKey: [this.detector.appKey, [
        Validators.required
      ]],
      executionInterval1: [getHours(this.detector.executionInterval), [
        Validators.required,
        Validators.min(0),
        Validators.max(10)
      ]],
      executionInterval2: [getMinutes(this.detector.executionInterval), [
        Validators.required,
        Validators.min(0),
        Validators.max(59)
      ]],
      executionInterval3: [getSeconds(this.detector.executionInterval), [
        Validators.required,
        Validators.min(0),
        Validators.max(59)
      ]],
      telemetricName: [this.detector.telemetricName, [
        Validators.required
      ]],
      type: [this.detector.type, [
        Validators.required,
        typeMustExistValidator(this.detectorTypes)
      ]],
      actionType: [this.detector.action?.type, [
        Validators.required,
        typeMustExistValidator(this.actionTypes)
      ]],
      minValue: [this.detector.minValue],
      maxValue: [this.detector.maxValue],
      outlierCount: [this.detector.outlierCount],
      aggregationOp: [this.detector.aggregationOp],
      comparisonOp: [wordToComparisonOperation(this.detector.comparisonOp ?? "")],
      threshold: [this.detector.threshold],
      email: [this.detector.action?.email],
      httpAddress: [this.detector.action?.httpAddress]
    }, { validator: [TotalDurationMoreThanOneSecond]});

    this.detectorForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateErrorMessages());
    // error status of control 'minValue' should update when max value is changed in case min > max
    this.detectorForm.get('maxValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.detectorForm.get('minValue')?.updateValueAndValidity();
    });
    // same for total duration validator
    this.detectorForm.get('executionInterval3')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.detectorForm.get('executionInterval1')?.updateValueAndValidity();
    });
    this.detectorForm.get('executionInterval2')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.detectorForm.get('executionInterval1')?.updateValueAndValidity();
    });
    this.registerValidationToggle();
    this.formInitialized = true;
  }

  submitForm() {
    const detector: Detector = this.detectorForm.value;

    detector.comparisonOp = comparisonOperationToWord(detector.comparisonOp!);
    detector.executionInterval = toExecutionInterval(
      this.detectorForm.value.executionInterval1,
      this.detectorForm.value.executionInterval2,
      this.detectorForm.value.executionInterval3
    );
    detector.action = new Action(
      this.detector?.action?.id ?? undefined, // ignore id when not updating
      this.detector?.action?.detectorId ?? undefined, // ignore detectorId when not updating
      this.selectedActionType,
      this.selectedActionType === this.actionTypes[1] ? this.detectorForm.value.email : undefined,
      this.selectedActionType === this.actionTypes[0] ? this.detectorForm.value.httpAddress : undefined
    );
    
    removeUndefinedAndNull(detector);
    removeUndefinedAndNull(detector.action);

    this.isUpdatingDetector ? detector.enabled = true : detector.enabled = this.detector.enabled;
    detector.enabled = true;
    if (this.isUpdatingDetector) detector.id = this.detector.id;
    this.createOrUpdateDetector(detector);
  }

  createOrUpdateDetector(detector: Detector) {
    if (this.isUpdatingDetector) {
      this.apiService.updateDetector(detector)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          if (res) {
            this.router.navigate(["/detector/", detector.id])
            this.sendingFailed = false;
          } else {
            this.sendingFailed = true;
          }
      });
    } else {
      // check if detector already exists
      this.apiService.detectorExists(detector.telemetricName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        // request successful
        if (res != null) {
          // does not exists
          if (!res) {
            this.alreadyExists = false;
            this.apiService.createDetector(detector)
              .pipe(takeUntil(this.destroy$))
              .subscribe(res => {
                // request successful
                if (res) {
                  this.router.navigate(["/detector", res.id])
                  this.sendingFailed = false;
                // error
                } else {
                  this.sendingFailed = true;
                }
            });
          } else {
            this.apiService.getDetectors(detector.telemetricName)
              .pipe(takeUntil(this.destroy$))
              .subscribe(res => {
                const d = res as Detector;
                this.alreadyExists = true;
                this.foundDetectorId = d.id!;
              });
          }
        } else {
          this.sendingFailed = true;
        }
      });
    }
  }

  // toggles validation of detector/action controls depending on selected type
  registerValidationToggle() {
    this.detectorForm.get('type')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log("detector");
        this.typeService.changeDetectorType(value);
        this.selectedDetectorType = value;
    });
    this.detectorForm.get('actionType')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log("action");
        this.typeService.changeActionType(value);
        this.selectedActionType = value;
    });
    // set initial type for child forms
    if (this.isUpdatingDetector) {
      this.typeService.changeActionType(this.detector!.action!.type!);
      this.typeService.changeDetectorType(this.detector!.type!);
    }
  }

  updateErrorMessages() {
    this.errors = {};
    
    for (const message of DetectorFormErrorMessages) {
      const control = this.detectorForm.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors != null && 
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
