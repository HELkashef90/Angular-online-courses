import { ToastService } from 'src/app/services/toast/toast.service';
import { StudentsService } from './../services/students/students.service';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  showErrors: boolean;
  loading: boolean;

  constructor(private translate: TranslateService, public bsModalRef: BsModalRef, private _student: StudentsService,
    private _toast: ToastService) { }
  @Input('user') user
  ngOnInit(): void {
    this.initForm();

  }
  initForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user.first_name, [Validators.required]),
      lastName: new FormControl(this.user.last_name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      mobile: new FormControl(this.user.mobile, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0,1,2,5]{1}[0-9]{8}$")]),
    });
  }
  decline() {


    this.bsModalRef.hide();

  }
  onUpdateClick(event) {
    event.preventDefault()
    this.showErrors = false;
    // console.log(this.registrationForm);
    if (!this.editForm.valid) {
      this.showErrors = true;
      window.scrollTo(0, 0);
      return
    }
    let userData = {
      "email": this.editForm.value.email,
      "mobile": this.editForm.value.mobile,
      "first_name": this.editForm.value.firstName,
      "last_name": this.editForm.value.lastName,
      "user_id": this.user.user_id
    }

    this.updateUserInfo(userData)
  }
  updateUserInfo(userData) {
    this.loading = true;
    this._student.updateUserInfo(userData).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this._toast.showToast(this.translate.instant('User Info. Updated Successfully'), 'success')
        this.bsModalRef.hide();
      }, err => {
        console.log(err);
        this.loading = false;
        this._toast.showToast(this.translate.instant('Please try again'), 'error')


      })
  }
}
