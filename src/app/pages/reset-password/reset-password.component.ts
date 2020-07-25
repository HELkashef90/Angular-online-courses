import { TranslateService } from '@ngx-translate/core';
import { ResetPasswordService } from './../services/resetPassword/reset-password.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  confirmReset: boolean = false;
  email: any = '';
  resetForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private _auth: AuthService,
    private _toastService: ToastService, private _spinner: SpinnerService,
    private _resetPass: ResetPasswordService,
    private formBuilder: FormBuilder,
    private router : Router,
    private translate : TranslateService) {
    this._spinner.showFullScreenSpinner()
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token')
    this.initForm()
    this.checkToken()
  }

  initForm() {

    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(''),
    });
  }

  onResetClick() {
    this._resetPass.resetReq({
      "email": this.email,
      "password": this.resetForm.get('password').value
    }).subscribe(res => {
      console.log(res);
      this._toastService.showToast(this.translate.instant("Password changed successfully"),"success")
      this.router.navigate(['login'])
    }, err => {
      console.log(err);

    })
  }
  checkToken() {
    if (this.token) {
      this._resetPass.confirmReset(this.token).subscribe(res => {
        console.log(res);
        this.email = res['email']
        this.confirmReset = true;
        this._spinner.hideFullScreenSpinner()
      }, err => {
        this._spinner.hideFullScreenSpinner()
        this.confirmReset = false;
        console.log(err);
      })
    }
  }



}
