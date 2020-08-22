import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  totalPages = 0;
  totalApprovedCourses: any;
  approvedCoursesArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  modalRef: BsModalRef;

  constructor(private _courseService: CourseService , private modalService: BsModalService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    console.log('on init');

    this.getAllCourses()
  }

  getAllCourses() {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._courseService.getEnrollmentCourse(this.reqPageNum,this.pageSize).subscribe(res => {
      console.log(res);
      if (res['statusCodeValue'] === 204) {
        this.lastPage = true
        this.loading = false
        console.log(this.approvedCoursesArray);
        return
      } else {
        this.reqPageNum += 1;
        this.totalPages = res['body']['totalPages']
        this.totalApprovedCourses = res['body']['totalElements']
        this.approvedCoursesArray.push(...res['body']['content'])
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

  onScroll() {
    this.getAllCourses()
  }
  ConfirmPopup(){
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Do you want to play the from this browser') ,

        callback: (result) => {
          if (result) {
            console.log('true');

          } else {
            console.log('cancel');

          }
        }
      }

    });
  }
}
