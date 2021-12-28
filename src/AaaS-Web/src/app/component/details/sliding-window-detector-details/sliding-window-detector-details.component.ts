import { Component, Input, OnInit } from '@angular/core';
import { Detector } from 'src/app/model/detector/detector';


@Component({
  selector: 'aaas-sliding-window-detector-details',
  templateUrl: './sliding-window-detector-details.component.html',
  styles: [
  ]
})
export class SlidingWindowDetectorDetailsComponent implements OnInit {

  @Input() detector!: Detector;
  
  constructor() { }

  ngOnInit(): void {
  }

}
