import { StudentsService } from './../services/students/students.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-restricted-users',
  templateUrl: './restricted-users.component.html',
  styleUrls: ['./restricted-users.component.scss']
})
export class RestrictedUsersComponent implements OnInit {
  disableScroll: Boolean;
  bsValue;
  searchForm: FormGroup;
  totalPages = 0;
  totalUsers: any;
  restrictedUsersArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  modalRef: BsModalRef;
  constructor(private _student: StudentsService, private _toast: ToastService, private translate: TranslateService
    , private modalService: BsModalService,private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getRestrictedUsers()
    this.initForms()
  }
  initForms() {
    this.searchForm = this._formBuilder.group({
      mobile_no: [''],
      email: [''],
      first_name: [''],
      last_name: [''],
    });
 
  }
  getRestrictedUsers(body = {}) {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._student.getRestrictedUsers(this.reqPageNum, this.pageSize, body).subscribe(res => {
      if (res['statusCodeValue'] === 204) {
        this.lastPage = true
        this.loading = false
        console.log(this.restrictedUsersArray);
        return
      } else {
        console.log(res);
        this.reqPageNum += 1;
        this.totalPages = res['body']['totalPages']
        this.totalUsers = res['body']['totalElements']
        this.restrictedUsersArray.push(...res['body']['content'])
        this.loading = false
        this.lastPage = res['body']['last']
      }

      // console.log(this.totalApprovedCourses);
      // console.log(this.approvedCoursesArray);
    }, err => {
      this.loading = false
      console.log(err);

    })
  }
  onSearchClick(searchForm){
    console.log(searchForm.value);
    this.resetTable(false,false)
    this.getRestrictedUsers(searchForm.value)
  }

  onScroll(searchForm?) {
    this.getRestrictedUsers(searchForm.value)
    // search ? this.onSearchClick(search, null, false) : this.getAllEnrollment();
  }



  onUnblockClick(user) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to unblock this user? '),
        list: [
          `${this.translate.instant('user name:')} ${user.first_name} ${user.last_name}`,
          `${this.translate.instant('user mobile number:')} ${user.mobile_no}`,
          `${this.translate.instant('user ip:')} ${user.ip_address}`,
          `${this.translate.instant('user email:')} ${user.email}`
        ],
        callback: (result) => {
          if (result) {
            this.unblockUser(user.user_id)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  unblockUser(id) {
    this._student.unblockUSer(id).subscribe(res => {
      console.log(res);
      this._toast.showToast(this.translate.instant("unblocked Successfully"), 'success');

      this.resetTable()
    }, err => {
      this._toast.showToast(this.translate.instant("please try again"), 'error');

      console.log(err);

    })
  }
  onBlockClick(user) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to block this user? '),
        list: [
          `${this.translate.instant('user name:')} ${user.first_name} ${user.last_name}`,
          `${this.translate.instant('user mobile number:')} ${user.mobile_no}`,
          `${this.translate.instant('user ip:')} ${user.ip_address}`,
          `${this.translate.instant('user email:')} ${user.email}`
        ],
        callback: (result) => {
          if (result) {
            this.blockUser(user.user_id)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  blockUser(id) {
    this._student.blockUSer(id).subscribe(res => {
      console.log(res);
      this._toast.showToast(this.translate.instant("blocked Successfully"), 'success');

      this.resetTable()
    }, err => {
      this._toast.showToast(this.translate.instant("please try again"), 'error');

      console.log(err);

    })
  }


  resetTable(getAllEnrollment = true, closeSearchSection = true) {
    this.totalPages = 0;
    this.totalUsers = 0
    this.restrictedUsersArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
   closeSearchSection ? this.closeSearchSection(true) : null;
    getAllEnrollment ? this.getRestrictedUsers() : null
  }



closeSearchSection(clear = false){
  var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.add("shoow");
    clear ? this.searchForm.reset() : null;
}
openSearchSection(){
  var verticalSideBar = document.querySelector(".searchSection");
  verticalSideBar.classList.toggle("shoow");
}
}
