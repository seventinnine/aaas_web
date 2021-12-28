import { Component, Input, OnInit } from '@angular/core';
import { Detector } from 'src/app/model/detector/detector';

@Component({
  selector: 'aaas-web-hook-action-details',
  templateUrl: './web-hook-action-details.component.html',
  styles: [
  ]
})
export class WebHookActionDetailsComponent implements OnInit {

  @Input() detector!: Detector;
  constructor() { }

  ngOnInit(): void {
  }

}
