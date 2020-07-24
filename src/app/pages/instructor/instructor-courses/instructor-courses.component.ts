import { Component, OnInit } from '@angular/core';
import { CreateCourseService } from '../services/createCourse/create-course.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {
  loading: boolean;
  instructorCourses: any;

  constructor(private _courseService: CreateCourseService,
    private router : Router,
    private _toastService: ToastService) { }

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
        this._toastService.showToast("Course deleted","info")
        this.getCourses()
      }, err => {
        console.log(err);
        if(err.status === 400 ){
          this._toastService.showToast("this course contains chapters, can't be deleted","warning")
        }
      })
    }

  }
  onEditClick(course){
    this._courseService.selectedCourseToEdit = course;
    this.router.navigate(['/instructor/editCourse'])
  }
}
