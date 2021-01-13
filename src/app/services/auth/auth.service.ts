import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})

export class AuthService {


  isLoggedIn: boolean = false;
  userType: any;

  constructor(private httpClient: HttpClient,
    private _spinnerService: SpinnerService, private router: Router) {
  }

  authUser() {
    this._spinnerService.showFullScreenSpinner();

    this.httpClient.post(environment._isLoggedIn, {
      "refreshToken": localStorage.getItem('refreshToken') || ""
    }).subscribe(res => {
      this.setUserAuthenticated(res)
      // this.redirectUserToDashboard(res['usertype'])
    }, err => {
      this._spinnerService.hideFullScreenSpinner()
      // this.redirectUserToDashboard('')

    })
  }
  isLoggedInAuth() {
    return this.httpClient.post(environment._isLoggedIn, {
      "refreshToken": localStorage.getItem('refreshToken') || ""
    })
  }
  setUserAuthenticated(authData: Object) {
    localStorage.setItem('authenticationToken', authData['authenticationToken'] || "")
    localStorage.setItem('refreshToken', authData['refreshToken'] || "")
    localStorage.setItem('expiresAt', authData['expiresAt'] || "")
    localStorage.setItem('username', authData['username'] || "")
    localStorage.setItem('usertype', authData['usertype'] || "")
    localStorage.setItem('email', authData['email'] || "")
    localStorage.setItem('role', JSON.stringify(authData['role']) || "")
    this.userType = authData['usertype'] || ""
    this.isLoggedIn = true;
    this._spinnerService.hideFullScreenSpinner()
  }

  setUserUnAuthenticated() {
    let lang = localStorage.getItem('lang')
    let email = localStorage.getItem('email')
    localStorage.clear();
    localStorage.setItem('lang', lang)
    localStorage.setItem('email', email)
    this.isLoggedIn = false;
    this.userType = ""
    this._spinnerService.hideFullScreenSpinner()
  }
  refreshToken() {
    this._spinnerService.showFullScreenSpinner();
    let refreshToken = localStorage.getItem('refreshToken') || "";
    let email = localStorage.getItem('email') || "";
    this.httpClient.post(environment._refreshToken, { refreshToken: refreshToken, email: email }).subscribe(res => {
      this.redirectUserToDashboard(res['usertype'])
      this.setUserAuthenticated(res)
    }, err => {
      this.setUserUnAuthenticated();
      this.router.navigateByUrl("")
    })
  }
  redirectUserToDashboard(userType = this.userType) {
    switch (userType) {
      case 1:
        //students
        this.router.navigateByUrl("user")
        break;
      case 2:
        //instructor  
        this.router.navigateByUrl("instructor")
        break;
      case 3:
        //instructor  
        this.router.navigateByUrl("admin")
        break;
      default:
        this.router.navigateByUrl("")
        break;
    }
  }

  signOut(redirectUrl?) {
    let payload = {
      "refreshToken": localStorage.getItem('refreshToken') || "",
      // "username": localStorage.getItem('username') || ""
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'body': JSON.stringify(payload)
      }),
      // body: payload
    }
    this.httpClient.post(environment._logOut, payload).subscribe(res => {
      // this.router.navigate(['login'], { queryParams: { redirectUrl } })
      // location.reload()
    }, err => {
      // location.reload()
    })
    this.router.navigate(['login'], { queryParams: { redirectUrl } })
    this.setUserUnAuthenticated()

  }
  activeAccount(token) {
    return this.httpClient.get(environment._activeAccount + token)
  }

  restrictUser() {
    return this.httpClient.post(environment._restrictUser, {})
  }
}

