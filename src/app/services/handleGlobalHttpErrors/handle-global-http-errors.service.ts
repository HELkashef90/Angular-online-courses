import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HandleGlobalErrorService } from '../handleGlobalError/handle-global-error.service';

@Injectable({
  providedIn: 'root'
})
export class HandleGlobalHttpErrorsService {

  constructor(private _authService: AuthService, private _handleGlobalErrorService: HandleGlobalErrorService) { }
  handleError(error: HttpErrorResponse) {
    console.error('handle global error >> ', error.status);
    if (error.status === 401) {
      //refresh token
      // this._authService.refreshToken()
      this._authService.setUserUnAuthenticated()
      this._authService.signOut(false);
      return
    } else if (error.status !== 403 && error.status !== 409 && error.status !== 400) {
      this._handleGlobalErrorService.handleUnexpectedError();
    }
  }
}
