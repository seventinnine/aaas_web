import { Component, OnInit } from '@angular/core';
import { LogMessage } from 'src/app/model/telemetricData/log-message';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'aaas-log-overview',
  templateUrl: './log-overview.component.html',
  styles: [
  ]
})
export class LogOverviewComponent implements OnInit {

  filterTerm: string = "";
  filterData: LogMessage[] = [];

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getLogMessages(environment.apiKey, "").subscribe(res => {
      if (res != null) this.filterData = res;
      
    });
  }

  getFilteredData(logs: LogMessage[]) {
    this.filterData = logs;
  }

}
