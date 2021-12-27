import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';

@Component({
  selector: 'aaas-appkey-select',
  templateUrl: './appkey-select.component.html',
  styles: [
  ]
})
export class AppkeySelectComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  appKeys: string[] = [];
  loadingAppKeys: boolean = true;
  errorLoadingAppKeys: boolean = false;
  @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getAppKeys()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      if (res != null) {
        this.appKeys = res;
        this.loadingAppKeys = false;
      } else {
        this.errorLoadingAppKeys = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
