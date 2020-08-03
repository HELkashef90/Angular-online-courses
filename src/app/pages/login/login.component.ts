import { environment } from './../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HandleGlobalErrorService } from './../../services/handleGlobalError/handle-global-error.service';
import { AuthService } from './../../services/auth/auth.service';
import { ToastService } from './../../services/toast/toast.service';
import { LoginService } from './../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showInvalidData: boolean = false;
  loading: boolean = false;
  redirectUrl: any;
  reCaptchaResponse: String = null;
  reCaptchaKey: string;
  loginForm: FormGroup;
  constructor(private _loginService: LoginService, private _toastService: ToastService, private _authService: AuthService,
    private _handleGlobalErrorService: HandleGlobalErrorService, private route: ActivatedRoute, private router: Router,
    private translate: TranslateService) {
    this.reCaptchaKey = environment._reCaptchaKey
  }
  ngOnInit(): void {
    this.loading = true;
    this.initForm()
    //  this._authService.authUser()
  }
  initForm() {
    this.loginForm = new FormGroup({
      reCaptcha : new FormControl('', [Validators.required])
    });
  }
  onReCapLoad() {
    setTimeout(() => {
      this.loading = false
    }, 500);
  }
  handleReCapSuccess($event) {
    console.log($event);
    this.reCaptchaResponse = $event

  }
  handleReCapReset() {
    this.reCaptchaResponse = null;

  }
  onLoginClick(event, userName, password) {
    event.preventDefault()
    this.showInvalidData = false;
    let isEmail = false;
    let isMobile = false;
    console.log(userName, password);
    if (new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(userName) && password.length > 2) {
      isEmail = true;
    }
    if (new RegExp('01[0,1,2,5]{1}[0-9]{8}$').test(userName) && password.length > 2) {
      isMobile = true;
    }
    if (isMobile && this.reCaptchaResponse) {
      this.login({
        "email_mobile": userName,
        "password": password,
        "logintype": '2',
        "recaptchaResponse": this.reCaptchaResponse
      })
      return
    }
    else if (isEmail && this.reCaptchaResponse) {
      this.login({
        "email_mobile": userName,
        "password": password,
        "logintype": '1',
        "recaptchaResponse": this.reCaptchaResponse

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
      this._toastService.showToast(this.translate.instant("you are logged in successfully"), 'success')
      this.loading = false;
      if (this.route.snapshot.queryParams['redirectUrl']) {
        this.router.navigateByUrl(this.route.snapshot.queryParams['redirectUrl'])
        return
      }
      this._authService.redirectUserToDashboard(res['usertype'])

    }, (err) => {
      console.log(err.status);
      if (err.status === 403) {
        this._authService.setUserUnAuthenticated();
        // this._toastService.showToast(this.translate.instant("User Name or Password incorrect, please try again"), 'error')
      }
      this.loading = false;

    })
  }

}
