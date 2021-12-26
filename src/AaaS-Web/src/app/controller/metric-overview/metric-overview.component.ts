import localeDe from '@angular/common/locales/de';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Metric } from 'src/app/model/telemetricData/metric';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';
import { ClientIdComparer } from 'src/app/util/client-id-comparer';

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
export class MetricOverviewComponent implements OnInit {

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

  private loadTelemetricNames() {
    this.apiService.getTelemetricNames(environment.apiKey).subscribe(res => {
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
    this.apiService.getClientInstances(environment.apiKey).subscribe(res => {
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

  ngOnInit(): void {
    this.loadTelemetricNames();
    this.loadClientInstances();
    this.customizeText = this.customizeText.bind(this);
  }

  showToastError() {
    this.isToastVisible = true;
  }

  showValueOnHover(arg: any) {
    return arg.valueText;
  }

  generateCharts() {
    // reset data
    this.charts = [];
    
    if (this.selectedClientInstances.length == 0 || this.selectedTelemetricNames.length != 1) {
      return;
    }
    let successCount: number = 0;
    let completionCount: number = 0;

    this.loadingChartData = true;
    let newCharts: ChartData[] = [];
    const metricName = this.selectedTelemetricNames[0];
    this.selectedClientInstances.forEach(ci => {
      this.apiService.getMetrics(environment.apiKey, ci, metricName).subscribe((res: Metric[]) => {
        if (res != null) {
          // don't make an empty chart :(
          console.log(res.length);
          if (res.length > 0) newCharts.push(new ChartData(ci, metricName, res));
          successCount++;
        }
        completionCount++;
        if (completionCount === this.selectedClientInstances.length) {
          this.loadingChartData = false;
          this.errorLoadingCharts = !(successCount === completionCount);
        }
      });
    });
    this.charts = newCharts;
  }

  customizeText(pointInfo: any) {
    return this.datePipe.transform(pointInfo.value, 'short');
  }
}
