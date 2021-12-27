import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aaas-item-not-found',
  templateUrl: './item-not-found.component.html',
  styles: [
  ]
})
export class ItemNotFoundComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() destination?: string;
  @Input() redirectButtonMessage: string = "take me down to concurrency city where green pretty is grass the girls the and are";
  @Input() offerRetry: boolean = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  reloadPage() {
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.router.navigate([this.router.url]));
  }

}
