import { environment } from 'src/environments/environment';
// import { PreventInspectService } from './services/preventInspect/prevent-inspect.service';
// import { ProtectVideosService } from './services/protectVideos/protect-videos.service';
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
    private _toastService: ToastService,/* private _protectVideosService: ProtectVideosService, private _preventInspect: PreventInspectService*/) {
    this._paramService.getParams();
    this._localizationService.init();
    // if (localStorage.getItem("authenticationToken")) {
    //   this._protectVideosService.check()
    // }
    // this._preventInspect.init()
    // this._authService.authUser();
    // this._PWAService.preventAddToHomeScreen()
    // this.clearCache()
    console.log('version ' + environment.appVersion);
  }
  ngOnInit() {

    // this.testSpinner()
  }


  clearCache() {
    if (localStorage.getItem('cleared')) {
      localStorage.removeItem('cleared')
    } else {
      localStorage.setItem('cleared', 'true')
      window.location.reload(true)
    }
  }

}
