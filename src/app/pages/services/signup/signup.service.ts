import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(private httpClint: HttpClient) { }

  signUp(userData: Object) {
    return this.httpClint.post(environment._signUp, userData)
  }
}
