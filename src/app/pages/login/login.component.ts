import { HandleGlobalErrorService } from './../../services/handleGlobalError/handle-global-error.service';
import { AuthService } from './../../services/auth/auth.service';
import { ToastService } from './../../services/toast/toast.service';
import { LoginService } from './../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showInvalidData: boolean = false;
  loading: boolean = false;

  constructor(private _loginService: LoginService, private _toastService: ToastService, private _authService: AuthService,
    private _handleGlobalErrorService: HandleGlobalErrorService) { }
  ngOnInit(): void {
  }
  onLoginClick(event, userName, password) {
    event.preventDefault()
    this.showInvalidData = false;
    let isEmail = false;
    let isMobile = false;
    console.log(userName, password);
    if (new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(userName)&& password.length > 2) {
      isEmail = true;
    }
    if (new RegExp("01[0,1,2,5]{1}[0-9]{8}").test(userName) && password.length > 2) {
      isMobile = true;
    }
    if (isMobile) {
      this.login({
        "email_mobile": userName,
        "password": password,
        "logintype": '2'
      })
      return
    }
    else if (isEmail) {
      this.login({
        email_mobile: userName,
        password: password,
        logintype: '1'
      })
      return
    }
    this.showInvalidData = true
  }
  
  login(userData: Object) {
    console.log(userData);

    this.loading = true;
    this._loginService.login(userData).subscribe((res) => {
      this._authService.setUserAuthenticated(res)
      console.log(res);
      this._toastService.showToast("you are logged in successfully", 'success')
      this.loading = false;
    }, (err) => {
      console.log(err.status);
      if (err.status === 403) {
        this._authService.setUserUnAuthenticated();
        this._toastService.showToast("User Name or Password incorrect, please try again", 'error')
        this.loading = false;
      } else {
        this._handleGlobalErrorService.handleUnexpectedError();
        this.loading = false;
      }

    })
  }

}
