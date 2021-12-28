import { Component, Input, OnInit } from '@angular/core';
import { Detector } from 'src/app/model/detector/detector';

@Component({
  selector: 'aaas-min-max-detector-details',
  templateUrl: './min-max-detector-details.component.html',
  styles: [
  ]
})
export class MinMaxDetectorDetailsComponent implements OnInit {

  @Input() detector!: Detector;
  constructor() { }

  ngOnInit(): void {
  }

}
