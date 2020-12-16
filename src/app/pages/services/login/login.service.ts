import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClint: HttpClient) { }

  login(userData: Object) {
    return this.httpClint.post(environment._loginAPI, userData)
  }
}
