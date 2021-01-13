import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from './../spinner/spinner.service';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HandleGlobalErrorService {

  constructor(private _toastService: ToastService, private _spinner: SpinnerService,
    private translate : TranslateService) { }

  handleUnexpectedError() {
    this._toastService.showToast(this.translate.instant("Unexpected error occurred, please try again"), 'error')
    this._spinner.hideFullScreenSpinner()
  }

}
