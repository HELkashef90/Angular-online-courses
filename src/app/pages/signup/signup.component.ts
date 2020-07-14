import { SignupService } from './../services/signup/signup.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HandleGlobalErrorService } from 'src/app/services/handleGlobalError/handle-global-error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _signUpService: SignupService, private _toastService: ToastService,
    private _handleGlobalErrorService: HandleGlobalErrorService) { }
  userData = {
    "email": "abdelrahm.osama.awad18@gmail.com",
    "mobile": "01008323448",
    "username": "ahmed10",
    "password": "ahmed",
    "firstname": "Ahmed",
    "lastname": "Osama",
    "usertype": "2"
  }
  ngOnInit(): void {
    this.signUp(this.userData)
  }
  signUp(userData: Object) {
    this._signUpService.signUp(userData).subscribe(res => {
      console.log(res);
      // this._toastService.showToast(res)
    }, err => {
      console.log(err);
      if (err.status === 409) {
        this._toastService.showToast(err.error, 'error')
      }else{
        this._handleGlobalErrorService.handleUnexpectedError();
      }

    })
  }

}
