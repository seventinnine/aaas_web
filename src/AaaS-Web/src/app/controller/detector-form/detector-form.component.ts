import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Detector } from 'src/app/model/detector/detector';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { typeMustExistValidator } from 'src/app/validator/type-must-exist-validator';
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
      /*
      title: [this.book.title, Validators.required],
      publisher: this.book.publisher,
      id: [this.book.id, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8)
      ]],
      description: this.book.description,
      author: this.book.author,
      year: this.book.year,
      price: this.book.price,
      picture: this.book.picture
      */
    })

    this.detectorForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {

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
