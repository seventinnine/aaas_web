import { Component, Input, OnInit } from '@angular/core';
import { Detector } from 'src/app/model/detector/detector';

@Component({
  selector: 'aaas-mail-action-details',
  templateUrl: './mail-action-details.component.html',
  styles: [
  ]
})
export class MailActionDetailsComponent implements OnInit {

  @Input() detector!: Detector;
  constructor() { }

  ngOnInit(): void {
  }

}
