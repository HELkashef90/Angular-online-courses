import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) { }

  sendForgotPassReq(data: Object) {
    return this.httpClient.post(environment._forgotPassword, data)
  }

  confirmReset(token) {
    return this.httpClient.get(environment._confirmResetPass + '?token=' + token);
  }
  resetReq(data: Object) {
    return this.httpClient.post(environment._resetReq, data)
  }
}
