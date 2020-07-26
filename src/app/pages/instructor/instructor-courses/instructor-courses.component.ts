import { EditCourseComponent } from './../edit-course/edit-course.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { CreateCourseService } from '../services/createCourse/create-course.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {
  loading: boolean;
  instructorCourses: any;
  modalRef: BsModalRef;

  constructor(private _courseService: CreateCourseService,
    private router: Router,
    private _toastService: ToastService,
    private translate: TranslateService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.getCourses()
  }
  getCourses() {
    this.loading = true;
    this._courseService.getCourses().subscribe(res => {
      this.loading = false
      console.log(res['body']);
      res['statusCodeValue'] === 200 ? this.instructorCourses = res['body'] : null;
    }, err => {
      this.loading = false
      console.log(err);

    })
  }

  ocDeleteClick(course) {
    if (confirm('Are you Sure?')) {
      this._courseService.deleteCourse(course.id).subscribe(res => {
        console.log(res);
        this._toastService.showToast(this.translate.instant("Course deleted"), "info")
        this.getCourses()
      }, err => {
        console.log(err);
        if (err.status === 400) {
          this._toastService.showToast(this.translate.instant("this course contains chapters, can't be deleted"), "warning")
        }
      })
    }

  }
  onEditClick(course) {

    this.modalRef = this.modalService.show(EditCourseComponent, {
      initialState: {
        selectedCourseToEdit: course
      },
      class: 'modal-lg'
    });






    // this._courseService.selectedCourseToEdit = course;
    // this.router.navigate(['/instructor/editCourse'])
  }
  ocViewCourseClick(course) {
    this.router.navigate(['/instructor/viewCourse', course.id])
  }
}
