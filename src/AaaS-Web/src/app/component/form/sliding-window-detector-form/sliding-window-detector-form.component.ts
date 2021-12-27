import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Detector } from 'src/app/model/detector/detector';
import { validAggregationOperations, validComparisonOperations } from 'src/app/validator/type-must-exist-validator';

@Component({
  selector: 'aaas-sliding-window-detector-form',
  templateUrl: './sliding-window-detector-form.component.html',
  styles: [
  ]
})
export class SlidingWindowDetectorFormComponent implements OnInit {

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };

  aggregationOperations: string[] = validAggregationOperations;
  comparisonOperations: string[] = validComparisonOperations;

  constructor() { }

  ngOnInit(): void {
  }

}
