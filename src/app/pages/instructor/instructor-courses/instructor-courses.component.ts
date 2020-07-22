import { Component, OnInit } from '@angular/core';
import { CreateCourseService } from '../services/createCourse/create-course.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {
  loading: boolean;
  instructorCourses: any;

  constructor(private _courseService: CreateCourseService) { }

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
}
