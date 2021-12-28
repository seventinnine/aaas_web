import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Detector } from 'src/app/model/detector/detector';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { validActionTypes, validDetectorTypes } from 'src/app/validator/type-must-exist-validator';
@Component({
  selector: 'aaas-detector-details',
  templateUrl: './detector-details.component.html',
  styles: [
  ],
  providers: []
})
export class DetectorDetailsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  detector?: Detector;
  updating: boolean = false;
  popupVisible: boolean = false;

  isToastVisible: boolean = false;
  toastType: string = "";
  toastMessage: string = "placeholder";

  detectorTypes: string[] = validDetectorTypes;
  actionTypes: string[] = validActionTypes;

  constructor(
    private route: ActivatedRoute, 
    private apiService: AaasApiService
  ) { 

  }

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(params =>  
      this.apiService.getDetectorById(params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(detector => {
        this.detector = detector;
      }));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  showToastUpdate(success: boolean, id?: number, newState?: boolean) {
    this.toastMessage = success ? `Detector ${id} ${newState ? "enabled" : "disabled"}!` : `Error when ${newState ? "enabling" : "disabling"} detector ${id}!`;
    this.toastType = success ? (newState ? 'success' : 'error') : 'error';
    this.isToastVisible = true;
  }

  enableDetector() {
    if (this.detector && !this.detector.enabled) {
      this.updating = true;
      this.detector.enabled = true;
      this.apiService.updateDetector(this.detector)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!this.detector) return;
        this.updating = false;
        if (res == null) {
          this.detector.enabled = false;
        }
        this.showToastUpdate(res != null, this.detector.id, this.detector.enabled);
      });
    }
  }
  disableDetector() {
    if (this.detector && this.detector.enabled) {
      this.updating = true;
      this.detector.enabled = false;
      this.apiService.updateDetector(this.detector)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (!this.detector) return;
        this.updating = false;
        if (res == null) {
          this.detector.enabled = true;
        }
        this.showToastUpdate(res != null, this.detector.id, this.detector.enabled);
      });
    }
  }
}