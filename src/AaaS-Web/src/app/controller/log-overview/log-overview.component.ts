import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LogMessage } from 'src/app/model/telemetricData/log-message';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'aaas-log-overview',
  templateUrl: './log-overview.component.html',
  styles: [
  ]
})
export class LogOverviewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  
  filterData: LogMessage[] = [];

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getLogMessages(environment.apiKey, "")
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      if (res != null) this.filterData = res;
      
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getFilteredData(logs: LogMessage[]) {
    this.filterData = logs;
  }

}
