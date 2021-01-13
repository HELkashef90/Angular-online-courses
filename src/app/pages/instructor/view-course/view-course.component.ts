import { CreateCourseService } from './../services/createCourse/create-course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  courseId: string;
  course: any;
  loading = false;
  chapters = [];
  constructor(private activatedRoute: ActivatedRoute, private _auth: AuthService,
    private _toastService: ToastService, private _spinner: SpinnerService, private _courseService : CreateCourseService
    ) {
    _spinner.showFullScreenSpinner()
  }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this._courseService.getCourse(this.courseId).subscribe(res => {
      console.log(res);
      this.course = res['body']
      this._spinner.hideFullScreenSpinner()

    }, err => {
      console.log(err);
      this._spinner.hideFullScreenSpinner()


    })
  }

  onCourseContentClick() {
    this.loading = true;
    this._courseService.getChaptersByCourseId(this.course.id).subscribe(res => {
      this.loading = false
      console.log(res);
      this.chapters = res['body']
    }, err => {
      this.loading = false

      console.log(err);

    })
  }
  

}
