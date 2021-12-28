import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
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

  // new subscribers receive the latest appKey
  appKeyStatus: ReplaySubject<string> = new ReplaySubject<string>(1);
  // for components that listen to the validity of the appKey
  appKeyAccepted: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  // for api calls only
  private currentAppKey!: string;

  private validAppKey: boolean = false;

  validAppKeySet(): boolean {
    return this.validAppKey;
  }

  getCurrentAppKey(): string {
    return this.currentAppKey;
  }

  setAppKey(key: string): void {
    const sub = this.appKeyExists(key)
      .subscribe(valid => {
        this.removeAppKeyFromLocalStorage();
        if (valid) {
          this.currentAppKey = key;
          this.validAppKey = true;
          this.storeAppKeyInLocalStorage();
          this.appKeyStatus.next(key);
        }
        this.appKeyAccepted.next(valid);
        sub.unsubscribe();
    });
  }

  setAppKeyFromLocalStorage(key: string): void {
    const sub = this.appKeyExists(key)
      .subscribe(valid => {
        if (valid) {
          this.currentAppKey = key;
          this.validAppKey = true;
          this.appKeyStatus.next(key);
        }
        this.appKeyAccepted.next(valid);
        sub.unsubscribe();
    });
  }

  // done in case the new appKey is invalid
  removeAppKeyFromLocalStorage() {
    localStorage.removeItem('appKey');
  }

   //bad idea but good for debugging css
  storeAppKeyInLocalStorage(): void {
    localStorage.setItem('appKey', this.currentAppKey);
  }
    
  // try to fetch app key from local storage
  tryLoadAppKeyFromLocalStorage(): void {
    const key = localStorage.getItem('appKey') || null;
    if (key) this.setAppKeyFromLocalStorage(key);
      
  }
  
  constructor(private http: HttpClient) { 
    this.appKeyStatus.next("");
  }

  private errorHandlerQuery(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  private errorHandlerQueryUndefined(error: Error | any): Observable<any> {
    console.log(error);
    return of(undefined);
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

  appKeyExists(key: string): Observable<boolean> {
    return this.http.get<ClientInstance[]>(`${environment.server}/Client/${key}`)
    .pipe(map<any, boolean>(res => res != null), catchError(this.errorHandlerBoolean));
  }

  getClientInstances(): Observable<string[]> {
    return this.http.get<ClientInstance[]>(`${environment.server}/ClientInstance?appkey=${this.currentAppKey}`)
      .pipe(map<any, string[]>(res => res.map((ci: ClientInstance) => ci.clientId)), catchError(this.errorHandlerQuery));
  }

  getMetrics(clientId?: string, metricName?: string): Observable<Metric[]> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "clientId", value: clientId}, {key: "metricName", value: metricName}]);
    return this.http.get<Metric[]>(`${environment.server}/Metric?appkey=${this.currentAppKey}${queryString}`)
      .pipe(map<any, Metric[]>(res => res), catchError(this.errorHandlerQuery));
  }

  getTelemetricNames(): Observable<string[]> {
    return this.http.get<Metric[]>(`${environment.server}/Metric?appkey=${this.currentAppKey}`)
      .pipe(map<any, string[]>(res => res.map((m: Metric) => m.name)), map(res => [...new Set(res)]), catchError(this.errorHandlerQuery));
  }
  /*
  getLogMessages(appkey: string, clientId?: string, name?: string, category?: string): Observable<LogMessage[]> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "clientId", value: clientId}, {key: "name", value: name}, {key: "category", value: category}]);
    return this.http.get<Detector[]>(`${environment.server}/Log?appkey=${appkey}${queryString}`)
      .pipe(map<any, LogMessage[]>(res => res), catchError(this.errorHandlerQuery));
  }
  */
  getLogMessages(searchTerm: string): Observable<LogMessage[]> {
    return this.http.get<Detector[]>(`${environment.server}/Log?appkey=${this.currentAppKey}&searchTerm=${searchTerm}`)
      .pipe(map<any, LogMessage[]>(res => res), catchError(this.errorHandlerQuery));
  }
  getDetectors(name?: string): Observable<Detector[]> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "name", value: name}]);
    return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${this.currentAppKey}${queryString}`)
    .pipe(map<any, Detector[]>(res => res), catchError(this.errorHandlerQuery));
  }

  detectorExists(name?: string): Observable<boolean> {
    let queryString: string = this.filterUndefinedOrEmptyQueryStrings([{key: "name", value: name}]);
    return this.http.get<Detector[]>(`${environment.server}/Detector?appkey=${this.currentAppKey}${queryString}`)
    .pipe(map<any, boolean>(res => res != null), catchError(this.errorHandlerQuery));
  }

  getDetectorById(id: number): Observable<Detector> {
    return this.http.get<Detector>(`${environment.server}/Detector/${id}?appkey=${this.currentAppKey}`)
      .pipe(map<any, Detector>(res => res), catchError(this.errorHandlerQuery));
  }

  createDetector(detector: Detector): Observable<Detector> {
    return this.http.post<any>(`${environment.server}/Detector`, detector)
      .pipe(map<any, Detector>(res => res), catchError(this.errorHandlerQuery));
  }

  updateDetector(detector: Detector): Observable<any> {
    return this.http.put<any>(`${environment.server}/Detector`, detector)
      .pipe(map<any, boolean>(res => true), catchError(this.errorHandlerBoolean));
  }

  deleteDetector(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}/Detector/${id}?appkey=${this.currentAppKey}`)
      .pipe(map<any, boolean>(res => true), catchError(this.errorHandlerBoolean));
  }

}
