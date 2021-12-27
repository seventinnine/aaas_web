import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'aaas-web-hook-action-form',
  templateUrl: './web-hook-action-form.component.html',
  styles: [
  ]
})
export class WebHookActionFormComponent implements OnInit {

  @Input() detectorForm!: FormGroup;
  @Input() errors!: { [key: string]: string };
  
  constructor() { }

  ngOnInit(): void {
  }

}
