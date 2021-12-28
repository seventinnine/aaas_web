import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeChangedService {

  detectorTypeChanged: ReplaySubject<string> = new ReplaySubject<string>(1);
  actionTypeChanged: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor() { }

  changeDetectorType(type: string) {
    this.detectorTypeChanged.next(type);
  }

  changeActionType(type: string) {
    this.actionTypeChanged.next(type);
  }
}
