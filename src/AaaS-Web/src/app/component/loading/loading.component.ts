import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aaas-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent implements OnInit {

  @Input() visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
