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
   return this.spinner.show();
  }
  hideFullScreenSpinner() {
   return this.spinner.hide();
  }
}
