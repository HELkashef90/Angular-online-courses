import { ExportService } from './../../../services/exportAs/export-as.service';
import { StudentsService } from './../services/students/students.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-advanced-search-payment-student',
  templateUrl: './advanced-search-payment-student.component.html',
  styleUrls: ['./advanced-search-payment-student.component.scss']
})
export class AdvancedSearchPaymentStudentComponent implements OnInit {
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
  searchForm: FormGroup;
  coursesArray: Object;
  chaptersArray: Object;
  instructorsArray: Object;

  constructor(private _student: StudentsService, private modalService: BsModalService,
    private translate: TranslateService, private _toast: ToastService,
    private _export: ExportService, private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllEnrollment()
    this.initForm()
    this.getCourses()
    this.getInstructors()
  }
  getInstructors() {
    this._student.advancedSearchGetInstructors().subscribe(res => {
      console.log(res);
      this.instructorsArray = res
    },
      err => {
        console.log(err);

      })
  }
  getCourses() {
    this._student.advancedSearchGetCourses().subscribe(res => {
      console.log(res);
      this.coursesArray = res
    }, err => {
      console.log(err);

    })
  }
  onCourseChange(id) {
    if (id) {
      this._student.advancedSearchGetChaptersByCourse(id).subscribe(res => {
        console.log(res);
        this.chaptersArray = res
      },
        err => {
          console.log(err);

        })
    }

  }
  initForm() {
    this.searchForm = this._formBuilder.group({
      mobile_no: [''],
      email: [''],
      first_name: [''],
      last_name: [''],
      instructor_id: [0],
      course_id: [0],
      chapter_id: [0],
      level_id: [0],
      enrollment_request_date_from: [''],
      enrollment_request_date_to: [''],

    });

  }
  getAllEnrollment(body = {}) {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._student.advancedSearchEnrollment(this.reqPageNum, this.pageSize, body).subscribe(res => {
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
  onSearchClick(searchForm) {
    console.log(searchForm.value);
    this.resetTable(false, false)
    let body = searchForm.value
    body.enrollment_request_date_from = new Date(searchForm.value.enrollment_request_date_from).getTime()
    body.enrollment_request_date_to = new Date(searchForm.value.enrollment_request_date_to).getTime()
    this.getAllEnrollment(body);
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.add("shoow");

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

  onScroll(searchForm?) {
    this.getAllEnrollment(searchForm.value)
    // search ? this.onSearchClick(search, null, false) : this.getAllEnrollment();
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
    this._student.approveStudentPayment(enrollment_id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Activated Successfully"), 'success');
      this.resetTable(true,false)
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
    this._student.deleteEnrollmentRequest(enrollment_id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Deleted Successfully"), 'success');
      this.resetTable(true,false)
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
    this._student.rejectEnrolment(enrollment_id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Deactivated Successfully"), 'success');
      this.resetTable(true,false)

      console.log(res);

    }, err => {
      console.log(err);

    })
  }


  resetTable(getAllEnrollment = true, closeSearchSection = true) {
    this.totalPages = 0;
    this.totalStudents = 0
    this.enrollmentStudentsArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
    closeSearchSection ? this.closeSearchSection(true) : null;
    getAllEnrollment ? this.getAllEnrollment(this.searchForm.value) : null
  }



  onExportClick(id, type) {
    this._export.exportElement(id, type)
  }
  // searchSeaction
  openSearchSection() {
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.toggle("shoow");
  }
  closeSearchSection(clear = false) {
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.add("shoow");
    clear ? this.initForm() : null;
  }
}


