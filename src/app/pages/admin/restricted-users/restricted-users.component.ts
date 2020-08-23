import { StudentsService } from './../services/students/students.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-restricted-users',
  templateUrl: './restricted-users.component.html',
  styleUrls: ['./restricted-users.component.scss']
})
export class RestrictedUsersComponent implements OnInit {
  disableScroll: Boolean;
  bsValue;

  totalPages = 0;
  totalUsers: any;
  restrictedUsersArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  modalRef: BsModalRef;
  constructor(private _student: StudentsService,private _toast: ToastService,private translate: TranslateService, ) { }

  ngOnInit(): void {
    this.getRestrictedUsers()

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

  onScroll(search?) {
    this.getRestrictedUsers()
    // search ? this.onSearchClick(search, null, false) : this.getAllEnrollment();
  }
  onUnlockClick(id) {
    this._student.unlockUSer(id).subscribe(res => {
      console.log(res);
      this._toast.showToast(this.translate.instant("unblocked Successfully"), 'success');

      this.resetTable()
    }, err => {
      this._toast.showToast(this.translate.instant("please try again"), 'error');

      console.log(err);

    })
  }
  resetTable(getAllEnrollment = true) {
    this.totalPages = 0;
    this.totalUsers = 0
    this.restrictedUsersArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
    getAllEnrollment ? this.getRestrictedUsers() : null
  }
  Search() {
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.toggle("shoow");
  }
  displaySearchSeaction() {
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.toggle("shoow");
  }

}
