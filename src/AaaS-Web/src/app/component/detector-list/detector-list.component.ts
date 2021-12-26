import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Detector } from 'src/app/model/detector/detector';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'aaas-detector-list',
  templateUrl: './detector-list.component.html',
  styles: [
  ]
})
export class DetectorListComponent implements OnInit {

  @ViewChild('dataGridRef', { static: false }) dataGrid!: DxDataGridComponent;
  @Output() showDetailsEvent = new EventEmitter<Detector>();

  filterResult: Detector[] = [];
  
  appKey: string = environment.apiKey;
  loadingDetectors: boolean = false;
  errorLoadingDetectors: boolean = false;

  displayMode = 'full';

  constructor(private apiService: AaasApiService) { }

  ngOnInit(): void {
    this.loadDetectors();
  }
  
  /*
  updateDetectorList(appKey: string) {
    this.appKey = appKey;
    this.loadDetectors();
  }
*/
  loadDetectors() {
    this.apiService.getDetectors(environment.apiKey).subscribe(res => {
      if (res != null) {
        this.filterResult = res;
        this.errorLoadingDetectors = false;
      } else {
        this.errorLoadingDetectors = true;
      }
      this.loadingDetectors = false;
    });
  }

}
