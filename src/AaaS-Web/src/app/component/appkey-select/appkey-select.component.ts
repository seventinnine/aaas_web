import { ThrowStmt } from '@angular/compiler';
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

  invalidKey: boolean = false;
  enterAppKeyPrompt: boolean = false;
  @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();

  currentAppKey!: string;

  constructor(
    private apiService: AaasApiService
  ) { }

  ngOnInit(): void {
    this.apiService.appKeyStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe(key => {
        this.enterAppKeyPrompt = key == "";
        this.currentAppKey = key;
    });
    this.apiService.appKeyAccepted
      .pipe(takeUntil(this.destroy$))
      .subscribe(valid => {
        this.enterAppKeyPrompt = false;
        this.invalidKey = !valid;
    });
  }

  checkAppKey() {
    this.apiService.setAppKey(this.currentAppKey);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
