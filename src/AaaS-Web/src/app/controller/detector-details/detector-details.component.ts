import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Detector } from 'src/app/model/detector/detector';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';
      import { take } from 'rxjs/operators';
@Component({
  selector: 'aaas-detector-details',
  templateUrl: './detector-details.component.html',
  styles: [
  ]
})
export class DetectorDetailsComponent implements OnInit {

  detector?: Detector;
  updating: boolean = false;
  popupVisible: boolean = false;

  isToastVisible: boolean = false;
  toastType: string = "";
  toastMessage: string = "placeholder";

  constructor(
    private route: ActivatedRoute, 
    private apiService: AaasApiService
  ) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>  
      this.apiService.getDetectorById(environment.apiKey ,params['id']).subscribe(detector => {
        this.detector = detector;
      }));
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
      this.apiService.updateDetector(this.detector).subscribe(res => {
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
      this.apiService.updateDetector(this.detector).subscribe(res => {
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