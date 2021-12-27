import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Detector } from 'src/app/model/detector/detector';

@Component({
  selector: 'aaas-min-max-detector-form',
  templateUrl: './min-max-detector-form.component.html',
  styles: [
  ]
})
export class MinMaxDetectorFormComponent implements OnInit {

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };

  constructor() { }

  ngOnInit(): void {
    
  }
  
}
