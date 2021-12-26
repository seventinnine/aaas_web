import localeDe from '@angular/common/locales/de';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LogMessage } from 'src/app/model/telemetricData/log-message';

@Component({
  selector: 'aaas-log-list',
  templateUrl: './log-list.component.html',
  styles: [
  ],
  providers: [DatePipe]
})
export class LogListComponent implements OnInit {

  isExpanded: boolean | null | undefined = null;
  @Input() displayData: LogMessage[] = [];

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.calculateCellValue = this.calculateCellValue.bind(this);
  }

  // allows user to sort column "Timestamp"
  calculateCellValue(rowdata:any) {
    return this.datePipe.transform(rowdata.timestamp, 'medium');
  }

  sortStringsConsideringDate = (value1: string, value2: string) => {
    return value1.localeCompare(value2);
  }

}
