import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap, tap } from 'rxjs';
import { LogMessage } from 'src/app/model/telemetricData/log-message';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'aaas-log-search',
  templateUrl: './log-search.component.html',
  styles: [
  ]
})
export class LogSearchComponent implements OnInit {

  logCategories: string[] = ['Warning', 'Trace', 'Error']

  /*
  categoryQuery: string = "";
  clientIdQuery: string = "";
  telemetricNameQuery: string = "";
*/
  @Output() metricFiltered = new EventEmitter<LogMessage[]>();
  //valueChanged = new EventEmitter<string>();
  keyUp = new EventEmitter<string>();

  

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    /*
    this.valueChanged.pipe(
      switchMap(searchTerm => this.filterLogMessages(searchTerm)),
    ).subscribe(res => this.metricFiltered.emit(res));
    */
    this.keyUp.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => this.filterLogMessages(searchTerm)),
    ).subscribe(res => this.metricFiltered.emit(res));
  }
  
  private filterLogMessages(searchTerm: string): Observable<LogMessage[] > {
    //console.log(`category: ${this.categoryQuery}, clientId: ${this.clientIdQuery}, telemetricName: ${this.telemetricNameQuery}`);
    /*
    return this.apiService.getLogMessages(
      environment.apiKey,
      this.clientIdQuery,
      this.telemetricNameQuery,
      this.categoryQuery
    );
    */
    return this.apiService.getLogMessages(environment.apiKey, searchTerm);
  }
  /*
  setCategoryQuery(e: string) {
    this.categoryQuery = e;
    this.valueChanged.emit("");
  }

  setClientIdQuery(e: string) {
    this.clientIdQuery = e;
    this.keyup.emit("");
  }

  setTelemetricNameQuery(e: string) {
    this.telemetricNameQuery = e;
    this.keyup.emit("");
  }
  */

}
