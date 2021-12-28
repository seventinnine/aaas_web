import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Metric } from 'src/app/model/telemetricData/metric';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';
import { ClientIdComparer } from 'src/app/util/client-id-comparer';
import { Subject, takeUntil } from 'rxjs';
import { groupBy } from '../../util/utils'

// local class for data of a chart and titles ...
class ChartData {
  constructor(
    public title: string,
    public telemetricName: string,
    public data: Metric[]
  ) {

  }
}

@Component({
  selector: 'aaas-metric-overview',
  templateUrl: './metric-overview.component.html',
  styles: [
  ],
  providers: [DatePipe]
})
export class MetricOverviewComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  
  chartTypes: string[] = ['Scatter', 'Line', 'Bar','Area', 'StepArea'];
  selectedChartType: string = "line";
  telemetricNames: string[] = [];
  clientInstances: string[] = [];

  selectedTelemetricNames: string[] = [];
  selectedClientInstances: string[] = [];
  
  charts: ChartData[] = [];
  loadingChartData: boolean = false;

  private telemetricNamesLoaded: boolean = false;
  private clientInstancesLoaded: boolean = false;
  private errorLoadingClientInstances: boolean = false;
  private errorLoadingTelemetricNames: boolean = false;

  selectionLoaded: boolean = false;
  errorLoadingSelection: boolean = false;
  errorLoadingCharts: boolean = false;

  isToastVisible: boolean = false;

  constructor(
    private apiService: AaasApiService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadTelemetricNames();
    this.loadClientInstances();
    this.customizeText = this.customizeText.bind(this);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private loadTelemetricNames() {
    this.apiService.getTelemetricNames()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      if (res != null) {
        this.telemetricNames = res;
        this.telemetricNamesLoaded = true;
        this.errorLoadingTelemetricNames = false;
      } else {
        this.errorLoadingTelemetricNames = true;
      }
      this.updateLoadingStatus();
    });
  }

  private loadClientInstances() {
    this.apiService.getClientInstances()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      if (res != null) {
        this.clientInstances = res.sort((a, b) => ClientIdComparer.compareClientIdByLastDigits(a, b));
        this.clientInstancesLoaded = true;
        this.errorLoadingClientInstances = false;
      } else {
        this.errorLoadingClientInstances = true;
      }
      this.updateLoadingStatus();
    });
  }

  private updateLoadingStatus() {
      this.errorLoadingSelection = this.errorLoadingTelemetricNames || this.errorLoadingClientInstances;
      this.selectionLoaded = this.telemetricNamesLoaded && this.clientInstancesLoaded;
  }

  showToastError() {
    this.isToastVisible = true;
  }

  // show value on hover
  showValueOnHover(arg: any) {
    return arg.valueText;
  }

  // add date pipe to x-axis
  customizeText(pointInfo: any) {
    return this.datePipe.transform(pointInfo.value, 'short');
  }

  generateCharts() {
    // reset data
    this.charts = [];
    
    if (this.selectedClientInstances.length == 0 || this.selectedTelemetricNames.length != 1) {
      return;
    }

    this.loadingChartData = true;

    // in case someone spams the button, do not show chart data which is currently being processed
    let newCharts: ChartData[] = [];
    const metricName = this.selectedTelemetricNames[0];

    // all metrics for this appKey
    this.apiService.getMetrics(undefined, metricName)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: Metric[]) => {
      if (res != null) {
        this.errorLoadingCharts = false;
        // group metrics by client instance
        const metricsGrouped: Record<string, Metric[]> = groupBy(res, i => i.clientId ?? "");
        for (let curr in metricsGrouped) {
          // don't make an empty chart :(
          if (this.selectedClientInstances.includes(curr) && metricsGrouped[curr].length > 0)
          newCharts.push(new ChartData(curr, metricName, metricsGrouped[curr]));
        }
      } else {
        this.errorLoadingCharts = true;
      }
      this.loadingChartData = false;
    });
    
    // set data
    this.charts = newCharts;
  }
}
