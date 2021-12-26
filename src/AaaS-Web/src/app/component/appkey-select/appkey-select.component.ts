import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';

@Component({
  selector: 'aaas-appkey-select',
  templateUrl: './appkey-select.component.html',
  styles: [
  ]
})
export class AppkeySelectComponent implements OnInit {

  appKeys: string[] = [];
  loadingAppKeys: boolean = true;
  errorLoadingAppKeys: boolean = false;
  @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getAppKeys().subscribe(res => {
      if (res != null) {
        this.appKeys = res;
        this.loadingAppKeys = false;
      } else {
        this.errorLoadingAppKeys = true;
      }
    }

    )
  }

}
