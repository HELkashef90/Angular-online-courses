import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {


  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient,
    private _spinnerService: SpinnerService, private router: Router) {
  }

  authUser() {
    this._spinnerService.showFullScreenSpinner();
    this.httpClient.get(environment._isLoggedIn).subscribe(res => {
      this.setUserAuthenticated(res)
      this.redirectUserToDashboard(res['usertype'])
    })
  }

  setUserAuthenticated(authData: Object) {
    localStorage.setItem('authenticationToken', authData['authenticationToken'])
    localStorage.setItem('refreshToken', authData['refreshToken'])
    localStorage.setItem('expiresAt', authData['expiresAt'])
    localStorage.setItem('username', authData['username'])
    localStorage.setItem('usertype', authData['usertype'])
    localStorage.setItem('role', JSON.stringify(authData['role']))
    this.isLoggedIn = true;
    this._spinnerService.hideFullScreenSpinner()
  }

  setUserUnAuthenticated() {
    localStorage.clear();
    this.isLoggedIn = false;
    this._spinnerService.hideFullScreenSpinner()
  }
  refreshToken() {
    this._spinnerService.showFullScreenSpinner();
    let refreshToken = localStorage.getItem('refreshToken') || "";
    let userName = localStorage.getItem('username') || "";
    this.httpClient.post(environment._refreshToken, { refreshToken: refreshToken, username: userName }).subscribe(res => {
      this.setUserAuthenticated(res)
    }, err => {
      this.setUserUnAuthenticated();
      this.router.navigateByUrl("")
    })
  }
  redirectUserToDashboard(userType) {
    switch (userType) {
      case 1:
        //students
        this.router.navigateByUrl("user", { replaceUrl: true })
        break;
      case 2:
        //instructor  
        this.router.navigateByUrl("instructor", { replaceUrl: true })
        break;
      default:
        this.router.navigateByUrl("", { replaceUrl: true })
        break;
    }
  }
}

