import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AaasApiService } from 'src/app/service/aaas-api/aaas-api.service';

@Component({
  selector: 'aaas-detector-deletion',
  templateUrl: './detector-deletion.component.html',
  styles: [
  ]
})
export class DetectorDeletionComponent implements OnInit {

  @Input() detectorId?: number;
  deletionError: boolean = false;
  popupVisible = false;

  cancelButtonOptions: any;
  confirmButtonOptions: any;

  constructor(
    private router: Router,
    private apiService: AaasApiService
  ) {

  }

  ngOnInit(): void {
  }

  deleteDetector() {
    if (this.detectorId) {
      this.apiService.deleteDetector(this.detectorId).subscribe(res => {
        if (res) {
          this.router.navigateByUrl("/detectors");
          this.deletionError = false;
          this.popupVisible = false;
        } else {
          this.deletionError = true;
        }
      })
    }
  }

}
