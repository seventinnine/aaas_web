import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Detector } from 'src/app/model/detector/detector';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { typeMustExistValidator, validDetectorTypes } from 'src/app/validator/type-must-exist-validator';
import { environment } from 'src/environments/environment';
import { DetectorFormErrorMessages } from './detector-form-error-messages';

@Component({
  selector: 'aaas-detector-form',
  templateUrl: './detector-form.component.html',
  styles: [
  ]
})
export class DetectorFormComponent implements OnInit {
  isUpdatingDetector: boolean = false;
  detectorForm!: FormGroup;
  detector: Detector = new Detector();
  detectorTypes = validDetectorTypes;
  errors: { [key: string]: string } = {};
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingDetector = true;
      this.apiService.getDetectorById(environment.apiKey, id).subscribe(detector => {
        this.detector = detector;
        this.initForm();
      })
    }
    this.initForm();
  }

  initForm() {
    this.detectorForm = this.fb.group({
      appKey: [environment.apiKey, Validators.required],
      executionInterval: [this.detector.executionInterval, [
        Validators.required,
        Validators.min(1),
        Validators.max(3600)
      ]],
      type: [this.detector.type, [
        Validators.required,
        typeMustExistValidator()
      ]]
    })

    this.detectorForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  buttonOptions: any = {
    text: 'Send',
    type: 'success',
    useSubmitBehavior: true
  };

  submitForm(e:any) {

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
