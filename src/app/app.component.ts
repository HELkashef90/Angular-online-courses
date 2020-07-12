import { SpinnerService } from './services/spinner/spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appInit: boolean = false
  title = 'SmartAcademy';
  constructor(private _spinnerService: SpinnerService) {

  }
  ngOnInit() {
    this.testSpinner()
  }
  testSpinner() {
    this._spinnerService.showFullScreenSpinner()
    setTimeout(() => {
      this._spinnerService.hideFullScreenSpinner()
      this.appInit = true
    }, 5000);
  }
}
