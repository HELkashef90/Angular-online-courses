import Player from '@vimeo/player';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-user-study-course',
  templateUrl: './user-study-course.component.html',
  styleUrls: ['./user-study-course.component.scss']
})
export class UserStudyCourseComponent implements OnInit {
  courseId: string;
  chaptersArray = [];
  chapterName = this.translate.instant('Please select a lecture');
  courseName: any;
  lectureName: any;
  lectureDesc: any;
  showPlayer = false;
  player: any;
  constructor(private activatedRoute: ActivatedRoute, private _auth: AuthService,
    private _toastService: ToastService, private _spinner: SpinnerService, private translate: TranslateService,
    private _courses: CourseService) { }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    console.log(this.courseId);
    this.getStudyCourse(this.courseId)
  }
  getStudyCourse(id) {
    this._courses.getStudyCourse(id).subscribe(res => {
      console.log(res);
      this.chaptersArray = res['body']
    }, err => {
      console.log(err);
    }
    )
  }
  back() {
    window.history.back()
  }
  onLectureClick(chapterName, courseName, lectureName, lectureDesc, lectureVimeoId) {
    this.chapterName = chapterName;
    this.courseName = courseName + '/';
    this.lectureName = lectureName;
    this.lectureDesc = lectureDesc || "No Description"

    console.log(lectureVimeoId);

    this.player.loadVideo(lectureVimeoId).then((id) => {
      // the video successfully loaded
      this.showPlayer = true;
    }).catch((error) => {
      switch (error.name) {
        case 'TypeError':
          // the id was not a number
          // this._toastService.showToast(this.translate.instant("You are not allowed to view this video"))

          break;

        case 'PasswordError':
          // the video is password-protected and the viewer needs to enter the
          // password first
          // this._toastService.showToast(this.translate.instant("You are not allowed to view this video"))

          break;

        case 'PrivacyError':
          // the video is password-protected or private
          // this._toastService.showToast(this.translate.instant("You are not allowed to view this video"))
          break;

        default:
          // some other error occurred
          this._toastService.showToast(this.translate.instant("You are not allowed to view this video or an error occurred, please try again"))

          break;
      }
    });
  }





  ngAfterViewInit() {
    let options = {
      id: 76979871,
      // controls: false,
      // width: 1000,
      // autoplay:true,
      responsive: true,
    }
    this.player = new Player('lectureContainer', options)





    //sidebar
    var sidebarBtn = document.getElementById('collapse_menu');

    sidebarBtn.onclick = function menuAnimation() {
      //alert('working')
      var verticalSideBar = document.querySelector(".vertical_nav");
      verticalSideBar.classList.toggle("vertical_nav__minify");
      var wrapper = document.querySelector(".wrapper");
      wrapper.classList.toggle("wrapper__minify");
      var sidekickToggle = document.querySelector(".chapterListToggle");
      sidekickToggle.classList.toggle("minify");
    }
  }
}
