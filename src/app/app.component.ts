import { ToastService } from './services/toast/toast.service';
import { PWAControllerService } from './services/PWAController/pwacontroller.service';
import { ParamsService } from './services/params/params.service';
import { SpinnerService } from './services/spinner/spinner.service';
import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { LocalizationService } from './services/localization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appInit: boolean = false
  title = 'SmartAcademy';

  constructor(private _spinnerService: SpinnerService, private _paramService: ParamsService,
    private _authService: AuthService,
    private _localizationService: LocalizationService,
    private _PWAService: PWAControllerService,
    private _toastService: ToastService) {
    this._paramService.getParams();
    // this._authService.authUser();
    this._localizationService.init();
    // this._PWAService.preventAddToHomeScreen()

  }
  ngOnInit() {
    // this.testSpinner()
  }
  testSpinner() {
    this._spinnerService.showFullScreenSpinner()
    this._toastService.showToast("Hello", "success")
    setTimeout(() => {
      this._spinnerService.hideFullScreenSpinner()
      this.appInit = true
      // this._PWAService.displayInstallPrompt()
    }, 5000);
  }
}
