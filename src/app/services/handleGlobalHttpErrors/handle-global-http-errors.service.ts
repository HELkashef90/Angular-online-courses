import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleGlobalHttpErrorsService {

  constructor(private _authService : AuthService) { }
  handleError(error: HttpErrorResponse) {
    console.error('handle global error >> ', error.status);
    if(error.status === 401){
      //refresh token
      this._authService.refreshToken()
    }
  }
}
