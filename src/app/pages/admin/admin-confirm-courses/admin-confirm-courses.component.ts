import { CoursesService } from './../services/courses/courses.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Component({
  selector: 'app-admin-confirm-courses',
  templateUrl: './admin-confirm-courses.component.html',
  styleUrls: ['./admin-confirm-courses.component.scss']
})
export class AdminConfirmCoursesComponent implements OnInit {
  totalPages = 0;
  totalCourses: any;
  coursesArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  modalRef: BsModalRef;
  disableScroll: Boolean;
  constructor(private modalService: BsModalService,
    private translate: TranslateService, private _toast: ToastService,private _courses : CoursesService) { }

  ngOnInit(): void {
    this.getAllCourses()

  }
  getAllCourses(mobile?, email?) {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._courses.getAllCourses(this.reqPageNum, this.pageSize, mobile, email).subscribe(res => {
      if (res['statusCodeValue'] === 204) {
        this.lastPage = true
        this.loading = false
        console.log(this.coursesArray);
        return
      } else {
        console.log(res);
        this.reqPageNum += 1;
        this.totalPages = res['totalPages']
        this.totalCourses = res['totalElements']
        this.coursesArray.push(...res['content'])
        this.loading = false
        this.lastPage = res['last']
      }

      // console.log(this.totalApprovedCourses);
      // console.log(this.approvedCoursesArray);
    }, err => {
      this.loading = false
      console.log(err);

    })
  }

  onScroll() {
    this.getAllCourses()
  }
  onApproveClick(course) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to Approve this course? '),
        list: [
          `${this.translate.instant('course name:')} ${course.course_title}`,
          `${this.translate.instant('instructor name:')} ${course.first_name}`,
          
        ],
        callback: (result) => {
          if (result) {
            this.approveCourse(course.course_id)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  approveCourse(id: any) {
    this._courses.approveCourse(id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Activated Successfully"), 'success');
      this.resetTable()
      console.log(res);

    }, err => {
      console.log(err);

    })
  }
  onRejectClick(course) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to reject this course? '),
        list: [
          `${this.translate.instant('course name:')} ${course.course_title}`,
          `${this.translate.instant('instructor name:')} ${course.first_name}`,
          
        ],
        callback: (result) => {
          if (result) {
            this.rejectCourse(course.course_id)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  rejectCourse(id: any) {
    this._courses.rejectCourse(id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Deactivated Successfully"), 'success');
      this.resetTable()
      console.log(res);
      console.log(res);

    }, err => {
      console.log(err);

    })
  }

  resetTable(getAllCourses = true) {
    this.totalPages = 0;
    this.totalCourses = 0
    this.coursesArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
    getAllCourses ? this.getAllCourses() : null
  }

}
