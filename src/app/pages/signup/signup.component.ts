import { SignupService } from './../services/signup/signup.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HandleGlobalErrorService } from 'src/app/services/handleGlobalError/handle-global-error.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userType: any;
  registrationForm: FormGroup;
  showErrors: boolean;
  loading: boolean;
  constructor(private _signUpService: SignupService, private _toastService: ToastService,
    private _handleGlobalErrorService: HandleGlobalErrorService,
    private _authService: AuthService,) { }
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
    // this.signUp(this.userData)
    this.initForm();
  }

  onSignUpClick(event) {
    event.preventDefault()
    this.showErrors = false;
    // console.log(this.registrationForm);
    if (!this.registrationForm.valid) {
      this.showErrors = true;
      window.scrollTo(0,0);
      return
    }
    let userData = {
      "email": this.registrationForm.value.email,
      "mobile": this.registrationForm.value.mobile,
      "username": this.registrationForm.value.fullName,
      "password": this.registrationForm.value.password,
      "firstname": this.registrationForm.value.fullName,
      "usertype": this.registrationForm.value.signAs
    }
    this.signUp(userData)
  }




  signUp(userData: Object) {
    this.loading = true;
    this._signUpService.signUp(userData).subscribe(res => {
      console.log(res['body']);
      this._authService.setUserAuthenticated(res['body'])
      this._toastService.showToast("user created", "success")
      this.loading = false;
    }, err => {
      console.log(err);
      if (err.status === 409) {
        this._toastService.showToast(err.error.message, 'error')
      } else {
        this._handleGlobalErrorService.handleUnexpectedError();
      }
      this.loading = false;

    })
  }

  onSignUpAsClick(event) {
    this.userType = event.target.value
  }

  initForm() {
    this.registrationForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required, Validators.pattern("^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$")]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("01[0,1,2,5]{1}[0-9]{8}")]),
      // address: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      city: new FormControl(null, [Validators.required]),
      signAs: new FormControl(null, [Validators.required]),
    });
  }
  ngAfterViewInit() { }
}
