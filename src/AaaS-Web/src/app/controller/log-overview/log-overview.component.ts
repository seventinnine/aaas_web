import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LogMessage } from 'src/app/model/telemetricData/log-message';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';

@Component({
  selector: 'aaas-log-overview',
  templateUrl: './log-overview.component.html',
  styles: [
  ]
})
export class LogOverviewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  appKey!: string;
  
  filterData: LogMessage[] = [];

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    
    this.apiService.appKeyStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe(key => {
        
        this.appKey = key;
        this.apiService.getLogMessages("")
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          if (res != null) this.filterData = res;
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getFilteredData(logs: LogMessage[]) {
    this.filterData = logs;
  }

}
