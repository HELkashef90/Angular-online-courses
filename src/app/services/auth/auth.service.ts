import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn: boolean = false;

  constructor(

  ) { }

  authUser() {
  }

  setUserAuthenticated(authData: Object) {
    localStorage.setItem('authenticationToken', authData['authenticationToken'])
    localStorage.setItem('refreshToken', authData['refreshToken'])
    localStorage.setItem('expiresAt', authData['expiresAt'])
    localStorage.setItem('username', authData['username'])
    localStorage.setItem('usertype', authData['usertype'])
    localStorage.setItem('role', JSON.stringify(authData['role']))
    this.isLoggedIn = true;
  }

  setUserUnAuthenticated() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}

