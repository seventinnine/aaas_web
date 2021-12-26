import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError, retry } from 'rxjs/operators';
import { Metric } from '../../model/telemetricData/metric';
import { Detector } from 'src/app/model/detector/detector';
import { LogMessage } from 'src/app/model/telemetricData/log-message';
import { ClientInstance } from 'src/app/model/client-instance/client-instance';

@Injectable({
  providedIn: 'root'
})

export class AaasApiService {

  constructor(private http: HttpClient) {

  }

  private errorHandlerQuery(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  private errorHandlerBoolean(error: Error | any): Observable<boolean> {
    console.log(error);
    return of(false);
  }
  
  private filterUndefinedOrEmptyQueryStrings(params: any[]): string {
    let res: string = "";
    params.forEach(kvp => {
      if (kvp.value && kvp.value != "") {
        res += `&${kvp.key}=${kvp.value}`;
      }
    });
    return res;
  }

  getAppKeys(): Observable<string[]> {
    return this.http.get<ClientInstance[]>(`${environment.server}/Client`)
      .pipe(map<any, string[]>(res => res), catchError(this.errorHandlerQuery));
  }

  getClientInstances(appkey: string): Observable<string[]> {
    return this.http.get<ClientInstance[]>(`${environment.server}/ClientInstance?appkey=${appkey}`)
      .pipe(map<any, string[]>(res => res.map((ci: ClientInstance) => ci.clientId)), catchError(this.errorHandlerQuery));
  }

  getMetrics(appkey: string, clientId?: string, metricName?: string): Observable<Metric[]> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "clientId", value: clientId}, {key: "metricName", value: metricName}]);
    return this.http.get<Metric[]>(`${environment.server}/Metric?appkey=${appkey}${queryString}`)
      .pipe(map<any, Metric[]>(res => res), catchError(this.errorHandlerQuery));
  }

  getTelemetricNames(appkey: string): Observable<string[]> {
    return this.http.get<Metric[]>(`${environment.server}/Metric?appkey=${appkey}`)
      .pipe(map<any, string[]>(res => res.map((m: Metric) => m.name)), map(res => [...new Set(res)]), catchError(this.errorHandlerQuery));
  }
  /*
  getLogMessages(appkey: string, clientId?: string, name?: string, category?: string): Observable<LogMessage[]> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "clientId", value: clientId}, {key: "name", value: name}, {key: "category", value: category}]);
    return this.http.get<Detector[]>(`${environment.server}/Log?appkey=${appkey}${queryString}`)
      .pipe(map<any, LogMessage[]>(res => res), catchError(this.errorHandlerQuery));
  }
  */
  getLogMessages(appkey: string, searchTerm: string): Observable<LogMessage[]> {
    return this.http.get<Detector[]>(`${environment.server}/Log?appkey=${appkey}&searchTerm=${searchTerm}`)
      .pipe(map<any, LogMessage[]>(res => res), catchError(this.errorHandlerQuery));
  }
  getDetectors(appkey: string, name?: string): Observable<Detector[]> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "name", value: name}]);
    return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${appkey}${queryString}`)
    .pipe(map<any, Detector[]>(res => res), catchError(this.errorHandlerQuery));
  }

  getDetectorById(appkey: string, id: number): Observable<Detector> {
    return this.http.get<Detector>(`${environment.server}/Detector/${id}?appkey=${appkey}`)
      .pipe(map<any, Detector>(res => res), catchError(this.errorHandlerQuery));
  }

  createDetector(detector: Detector): Observable<any> {
    return this.http.post<any>(`${environment.server}/Detector`, detector)
      .pipe(map<any, boolean>(res => true), catchError(this.errorHandlerBoolean));
  }

  updateDetector(detector: Detector): Observable<any> {
    return this.http.put<any>(`${environment.server}/Detector`, detector)
      .pipe(map<any, boolean>(res => true), catchError(this.errorHandlerBoolean));
  }

  deleteDetector(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/Detector/${id}?appkey=${environment.apiKey}`)
      .pipe(map<any, boolean>(res => true), catchError(this.errorHandlerBoolean));
  }

}
