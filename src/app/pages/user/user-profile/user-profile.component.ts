import { Router } from '@angular/router';
import { UpdateProfileService } from './../../../services/updateProfile/update-profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  showInfoErrors
  constructor(private _formBuilder: FormBuilder, private _updateProfile: UpdateProfileService, private _toastService: ToastService, private translate: TranslateService,
    private router : Router) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.profileForm = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
  }
  onSaveClick() {
    if (this.profileForm.invalid) {
      this.showInfoErrors = true;
      return
    }
    this._updateProfile.updateProfile(this.profileForm.value).subscribe(res => {
      console.log(res);
      this._toastService.showToast(this.translate.instant('Profile Updated Successfully'),'success');
      this.router.navigate(['user/dashboard'])
    }, err => {
      console.log(err);
      this._toastService.showToast(this.translate.instant('Profile not Updated, please try again'),'error')

    })
  }
}
