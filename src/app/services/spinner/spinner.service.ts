import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) { }
  ngOnInit() {
  
  }
  showFullScreenSpinner() {
    this.spinner.show();
  }
  hideFullScreenSpinner() {
    this.spinner.hide();
  }
}
