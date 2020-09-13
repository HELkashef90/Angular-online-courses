import { ExportService } from './../../../services/exportAs/export-as.service';
import { StudentsService } from './../services/students/students.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-students-all-courses',
  templateUrl: './admin-students-all-courses.component.html',
  styleUrls: ['./admin-students-all-courses.component.scss']
})
export class AdminStudentsAllCoursesComponent implements OnInit {
  @ViewChild('searchElm') searchElm: ElementRef
  totalPages = 0;
  totalStudents: any;
  enrollmentStudentsArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  modalRef: BsModalRef;
  disableScroll: Boolean;
  constructor(private _students: StudentsService, private modalService: BsModalService,
    private translate: TranslateService, private _toast: ToastService,
    private _export : ExportService
  ) { }

  ngOnInit(): void {
    this.getAllEnrollment()
  }
  onSearchClick(search, event?, resetTable = true) {
    event?.preventDefault()
    // this.showInvalidData = false;
    let isEmail = false;
    let isMobile = false;
    console.log(search);
    if (new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(search)) {
      isEmail = true;
    }
    if (new RegExp("^01[0,1,2,5]{1}[0-9]{8}$").test(search)) {
      isMobile = true;
    }
    if (isMobile) {
      // this.disableScroll = true;
      console.log('mobile');
      resetTable ? this.resetTable(false) : null;
      this.getAllEnrollment(search)
      return
    }
    else if (isEmail) {
      // this.disableScroll = true;
      console.log('isEmail');
      resetTable ? this.resetTable(false) : null;
      this.getAllEnrollment(null, search)

      return
    }
    // this.showInvalidData = true
    this._toast.showToast(this.translate.instant('Please enter a valid mobile number or email', 'warning'))
  }
  searchChange(search) {
    if (!search.value) {
      this.disableScroll = false;
      this.resetTable()
    }
  }
  clearSearch(search) {
    search.value = "";
    this.disableScroll = false;
    this.resetTable()
  }
  getAllEnrollment(mobile?, email?) {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._students.getEnrollmentStudents(this.reqPageNum, this.pageSize, mobile, email).subscribe(res => {
      if (res['statusCodeValue'] === 204) {
        this.lastPage = true
        this.loading = false
        console.log(this.enrollmentStudentsArray);
        return
      } else {
        console.log(res);
        this.reqPageNum += 1;
        this.totalPages = res['body']['totalPages']
        this.totalStudents = res['body']['totalElements']
        this.enrollmentStudentsArray.push(...res['body']['content'])
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

  onScroll(search) {
    search ? this.onSearchClick(search, null, false) : this.getAllEnrollment();
  }
  onApproveClick(student, search) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to Approve this payment of ') + student.chapter_fee + this.translate.instant(" EGP?"),
        list: [
          `${this.translate.instant('student name:')} ${student.first_name} ${student.last_name}`,
          `${this.translate.instant('student mobile number:')} ${student.mobile_no}`,
          `${this.translate.instant('course name:')} ${student.course_title}`,
          `${this.translate.instant('chapter name:')} ${student.chapter_title}`
        ],
        callback: (result) => {
          if (result) {
            this.approveStudentPayment(student.enrollment_id, search)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  approveStudentPayment(enrollment_id: any, search) {
    this._students.approveStudentPayment(enrollment_id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Activated Successfully"), 'success');
      search ? this.onSearchClick(search) : this.resetTable();
      console.log(res);

    }, err => {
      console.log(err);

    })
  }
  onRejectClick(student, search) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to Reject this payment of ') + student.chapter_fee + this.translate.instant(" EGP?"),
        list: [
          `${this.translate.instant('student name:')} ${student.first_name} ${student?.last_name || ""}`,
          `${this.translate.instant('student mobile number:')} ${student.mobile_no}`,
          `${this.translate.instant('course name:')} ${student.course_title}`,
          `${this.translate.instant('chapter name:')} ${student.chapter_title}`
        ],
        callback: (result) => {
          if (result) {
            this.rejectEnrolment(student.enrollment_id, search)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  rejectEnrolment(enrollment_id: any, search) {
    this._students.rejectEnrolment(enrollment_id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Deactivated Successfully"), 'success');
      search ? this.onSearchClick(search) : this.resetTable();

      console.log(res);

    }, err => {
      console.log(err);

    })
  }

  onDeleteClick(student, search){
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to delete this request'),
        list: [
          `${this.translate.instant('student name:')} ${student.first_name} ${student.last_name}`,
          `${this.translate.instant('student mobile number:')} ${student.mobile_no}`,
          `${this.translate.instant('course name:')} ${student.course_title}`,
          `${this.translate.instant('chapter name:')} ${student.chapter_title}`
        ],
        callback: (result) => {
          if (result) {
            this.deleteEnrolmentRequest(student.enrollment_id, search)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  deleteEnrolmentRequest(enrollment_id: any, search) {
    this._students.deleteEnrollmentRequest(enrollment_id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Deleted Successfully"), 'success');
      search ? this.onSearchClick(search) : this.resetTable();

      console.log(res);

    }, err => {
      console.log(err);

    })
  }
  
  resetTable(getAllEnrollment = true) {
    this.totalPages = 0;
    this.totalStudents = 0
    this.enrollmentStudentsArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
    getAllEnrollment ? this.getAllEnrollment() : null
  }



  onExportClick(id,type){
    this._export.exportElement(id,type)
  }
}
