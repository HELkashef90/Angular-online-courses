import { CartService } from './../services/cart/cart.service';
import { CourseService } from './../services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptsService } from 'src/app/services/lazyLoadScripts/lazy-load-scripts.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-user-view-course',
  templateUrl: './user-view-course.component.html',
  styleUrls: ['./user-view-course.component.scss']
})
export class UserViewCourseComponent implements OnInit {
  courseId: string;
  course: any;
  loading = false;
  chapters = [];
  constructor(private activatedRoute: ActivatedRoute, private _auth: AuthService,
    private _toastService: ToastService, private _spinner: SpinnerService,
    private _courseService: CourseService,
    public cart: CartService) {
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
  checkChapterOnCart(chapter) {
    return this.cart.isChapterExistInCart(chapter)
  }
}
