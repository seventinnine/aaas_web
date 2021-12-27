import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Detector } from 'src/app/model/detector/detector';

@Component({
  selector: 'aaas-mail-action-form',
  templateUrl: './mail-action-form.component.html',
  styles: [
  ]
})
export class MailActionFormComponent implements OnInit {

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }


}
