import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClint: HttpClient) { }

  login(userName: string, password: string) {
    return this.httpClint.post(environment._loginAPI, {
      "username": userName,
      "password": password
    })
  }
}
