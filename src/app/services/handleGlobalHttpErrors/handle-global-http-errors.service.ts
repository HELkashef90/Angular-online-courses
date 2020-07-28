import { ToastService } from './../toast/toast.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HandleGlobalErrorService } from '../handleGlobalError/handle-global-error.service';
import { RouterStateSnapshot, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleGlobalHttpErrorsService {
  unRedirectRoutes = ['/signup', '/login']
  constructor(private _authService: AuthService, private _handleGlobalErrorService: HandleGlobalErrorService, private _toast: ToastService, private router: Router, private route: ActivatedRoute) { }
  handleError(error: HttpErrorResponse) {

    // console.error('handle global error >> ', error.status);
    if (error.status === 401) {

      console.log(location.href.split('#')[1]);
      //refresh token
      // this._authService.refreshToken()
      this._authService.setUserUnAuthenticated()
      if (this.unRedirectRoutes.includes(location.href.split('#')[1])) {
        this._authService.signOut();
        return
      }
      this._authService.signOut(location.href.split('#')[1]);
      return

    } else if (error.error.message) {
      this._toast.showToast(error.error.message, "error")
    } else if (error.status >= 500 || error.status < 400) {
      this._handleGlobalErrorService.handleUnexpectedError();
    }
  }
}
