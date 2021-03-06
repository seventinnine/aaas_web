import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LogMessage } from 'src/app/model/telemetricData/log-message';
import { ClientIdComparer } from 'src/app/util/client-id-comparer';

@Component({
  selector: 'aaas-log-list',
  templateUrl: './log-list.component.html',
  styles: [
  ],
  providers: [DatePipe]
})

export class LogListComponent implements OnInit {

  isExpanded: boolean = false;
  groupingEnabled: boolean = true;
  @Input() displayData: LogMessage[] = [];

  clientIdGrouping: number = 0;
  categoryGrouping: number = 1;
  nameGrouping: number = 2;

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.calculateTimestampValue = this.calculateTimestampValue.bind(this);
  }

  // pipe date
  calculateTimestampValue(rowdata:any) {
    return this.datePipe.transform(rowdata.timestamp, 'medium');
  }

  // allows user to sort column "Timestamp"
  sortStringsConsideringDate = (value1: string, value2: string) => {
    return value1.localeCompare(value2);
  }

  // enabled correct sorting of "ClientId" by numbers after '_'
  sortClientIdByLastDigits = (value1: string, value2: string) => {
    return ClientIdComparer.compareClientIdByLastDigits(value1, value2);
  }

  updateGrouping(e: any) {
    if (e.value) {
      this.clientIdGrouping = 0;
      this.categoryGrouping = 1;
      this.nameGrouping = 2;
    } else { // index -1 disables grouping
      this.clientIdGrouping = -1;
      this.categoryGrouping = -1;
      this.nameGrouping = -1;
    }
    this.groupingEnabled = e.value;
  }

  updateExpansion(e: any) {
    this.isExpanded = e.value;
  }

}
