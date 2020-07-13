import { ToastService } from './../../services/toast/toast.service';
import { LoginService } from './../services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService: LoginService, private _toastService: ToastService) { }

  ngOnInit(): void {
    console.log('login init');
    this.login('ahmed', 'ahmed')
  }
  login(userName: string, password: string) {

    this._loginService.login(userName, password).subscribe((res) => {
      console.log(res);
      localStorage.setItem('authenticationToken', res['authenticationToken'])
      localStorage.setItem('refreshToken', res['refreshToken'])
      localStorage.setItem('expiresAt', res['expiresAt'])
      localStorage.setItem('username', res['username'])
      localStorage.setItem('usertype', res['usertype'])
      localStorage.setItem('role', JSON.stringify(res['role']))
      this._toastService.showToast("you are logged in successfully", 'success')

    }, (err) => {
      console.log(err.status);
      if (err.status === 403) {
        this._toastService.showToast("User Name or Password incorrect, please try again", 'error')
      }

    })
  }

}
