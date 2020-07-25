import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../services/toast/toast.service';
import { ResetPasswordService } from './../services/resetPassword/reset-password.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  sent: boolean;

  constructor(private _resetPass: ResetPasswordService,
    private _toast: ToastService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.resetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    });
  }
  onResetClick() {
    this._resetPass.sendForgotPassReq({
      "email_mobile": this.resetForm.get('email').value,
      "logintype": "1"
    }).subscribe(res => {
      console.log(res);
      this.sent = true
    }, err => {
      console.log(err);
      this._toast.showToast(this.translate.instant("Please try again", 'warning'))
    })
  }
}
