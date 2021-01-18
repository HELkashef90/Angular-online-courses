import { TranslateService } from '@ngx-translate/core';
import { SignupService } from './../services/signup/signup.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HandleGlobalErrorService } from 'src/app/services/handleGlobalError/handle-global-error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('reCaptchaElm') reCaptchaElm
  userType: any;
  registrationForm: FormGroup;
  showErrors: boolean;
  loading: boolean;
  reCaptchaResponse: String = null;
  reCaptchaKey: string;
  userLang: string;
  constructor(private _signUpService: SignupService, private _toastService: ToastService,
    private _handleGlobalErrorService: HandleGlobalErrorService,
    private _authService: AuthService,
    private translate: TranslateService,
    private router: Router,public _local: LocalizationService) {
    this.reCaptchaKey = environment._reCaptchaKey
  }
  userData = {
    "email": "abdelrahm.osama.awad52@gmail.com",
    "mobile": "01008323444",
    "username": "ahmed10",
    "password": "ahmed",
    "firstname": "Ahmed",
    "lastname": "Osama",
    "usertype": "2"
  }
  
  ngOnInit(): void {
    // this._authService.authUser()
    // this.signUp(this.userData)
    this.loading = true;
    this.userLang = this._local.getUserLang()

    this.initForm();
  }
  onReCapLoad() {
    setTimeout(() => {
      this.loading = false
    }, 500);
  }

  onSignUpClick(event) {
    event.preventDefault()
    this.showErrors = false;
    // console.log(this.registrationForm);
    if (!this.registrationForm.valid || this.registrationForm.get('confirmPassword').invalid || this.registrationForm.get('confirmPassword').value !== this.registrationForm.get('password').value) {
      this.showErrors = true;
      window.scrollTo(0, 0);
      return
    }
    let userData = {
      "email": this.registrationForm.value.email,
      "mobile": this.registrationForm.value.mobile,
      "username": this.registrationForm.value.firstName + ' ' + this.registrationForm.value.lastName,
      "password": this.registrationForm.value.password,
      "usertype": this.registrationForm.value.signAs,
      "firstname": this.registrationForm.value.firstName,
      "lastname": this.registrationForm.value.lastName,
      "recaptchaResponse": this.registrationForm.value.reCaptcha,
    }
    this.signUp(userData)
  }




  signUp(userData: Object) {
    this.loading = true;
    this._signUpService.signUp(userData).subscribe(res => {
      console.log(res['body']);
      // this._authService.setUserAuthenticated(res['body'])
      this._toastService.showToast(this.translate.instant("Account created"), "success");
      this.router.navigate(['afterSingUp'])
      this.loading = false;
    }, err => {
      console.log(err);
      if (err.status === 409) {
        // this._toastService.showToast(err.error.message, 'error')
      }
      this.loading = false;
      this.resetReCaptcha()
    })
  }

  onSignUpAsClick(event) {
    this.userType = event.target.value
  }
  userTypeClick(id){
    //1 student 2 instructor
    this.registrationForm.get('signAs').setValue(id)
  }
  initForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0,1,2,5]{1}[0-9]{8}$")]),
      // address: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      // city: new FormControl(null, [Validators.required]),
      signAs: new FormControl('1', [Validators.required]),
      reCaptcha: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),

    });
  }

  resetReCaptcha() {
    this.loading = true;
    this.reCaptchaElm.resetCaptcha()
    this.reCaptchaResponse = null;
    this.loading = false;
  }
  ngAfterViewInit() { }
}
