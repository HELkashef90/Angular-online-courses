import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Player from '@vimeo/player';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { CourseService } from '../services/course/course.service';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    private _courses: CourseService, private router: Router,
    private deviceService: DeviceDetectorService,
    private http: HttpClient
  ) {
    console.log('study constructor');

  }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    console.log(this.courseId);
  }
  getStudyCourse(id) {
    this._spinner.showFullScreenSpinner()
    this._courses.getStudyCourse(id).subscribe(res => {
      console.log(res);
      this.chaptersArray = res['body']
      if (this.chaptersArray?.length > 0) {

        for (let j = 0; j < this.chaptersArray?.length; j++) {
          for (let i = 0; i < this.chaptersArray[j]?.studentEnrolledContent.length; i++) {
            console.log(this.chaptersArray[j]?.studentEnrolledContent[i]?.is_Active);
            if (this.chaptersArray[j]?.studentEnrolledContent[i]?.is_Active) {
              let chapter = this.chaptersArray[j]
              let lecture = this.chaptersArray[j]?.studentEnrolledContent[i]
              this.onLectureClick(chapter?.studentEnrolledChapter?.chapter_title, chapter?.studentEnrolledChapter?.course_title, lecture?.content_title, lecture?.content_description, lecture?.content_Id)
              break
            }
          }
        }

      }
      // if (this.chaptersArray?.length > 0) {
      //   let chapter = this.chaptersArray[0]
      //   let lecture = this.chaptersArray[0]?.studentEnrolledContent[0]
      //   this.onLectureClick(chapter?.studentEnrolledChapter?.chapter_title, chapter?.studentEnrolledChapter?.course_title, lecture?.content_title, lecture?.content_description, lecture?.content_Id)
      // }
      if (res['body'].length === 0 || res['body']['status'] === "204") {
        this._toastService.showToast(this.translate.instant("you Don't have any chapters in this course to view"), 'warning')
        this.router.navigate(['/user/courses'])
      }
      this._spinner.hideFullScreenSpinner()
    }, err => {
      this._spinner.hideFullScreenSpinner()
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
    this.lectureDesc = lectureDesc || this.translate.instant("No Description")

    console.log(lectureVimeoId);
    this._spinner.showFullScreenSpinner()

    this.player.loadVideo(lectureVimeoId).then((id) => {
      // the video successfully loaded
      this.showPlayer = true;
      this._spinner.hideFullScreenSpinner()
    }).catch((error) => {
      switch (error.name) {
        case 'TypeError':
          // the id was not a number
          // this._toastService.showToast(this.translate.instant("You are not allowed to view this video"))
          this._spinner.hideFullScreenSpinner()
          this._toastService.showToast(this.translate.instant("You are not allowed to view this video or an error occurred, please try again"))

          console.log('TypeError');

          break;

        case 'PasswordError':
          // the video is password-protected and the viewer needs to enter the
          // password first
          // this._toastService.showToast(this.translate.instant("You are not allowed to view this video"))
          this._spinner.hideFullScreenSpinner()
          this._toastService.showToast(this.translate.instant("You are not allowed to view this video or an error occurred, please try again"))

          console.log('PasswordError');

          break;

        case 'PrivacyError':
          // the video is password-protected or private
          // this._toastService.showToast(this.translate.instant("You are not allowed to view this video"))
          this._spinner.hideFullScreenSpinner()
          this._toastService.showToast(this.translate.instant("You are not allowed to view this video or an error occurred, please try again"))

          console.log('PrivacyError');

          break;

        default:
          // some other error occurred
          this._toastService.showToast(this.translate.instant("You are not allowed to view this video or an error occurred, please try again"))
          this._spinner.hideFullScreenSpinner()
          console.log('default');

          break;
      }
    });
  }

  ngAfterViewInit() {
    this.getQuality()
  }
  getQuality() {
    this.http.get(environment._getVideoQuality).subscribe(res => {
      console.log(">>>"+res);

      this.initPlayer(res['quality'])
      this.getStudyCourse(this.courseId)

    }, (err) => {
      console.log(err);
      this.initPlayer('360p')
      this.getStudyCourse(this.courseId)
    })
  }

  initPlayer(quality) {

    let options = {
      id: 76979871,
      responsive: true,
      quality: quality
    }
    this.player = new Player('lectureContainer', options)
    this.forceQuality(quality)

  }
  forceQuality(quality) {
    this.player.on('qualitychange', (data) => {
      // data is an object containing properties specific to that event
      console.log(data);

      setTimeout(() => {
        // if (this.deviceService.isMobile()) {
        if (data.quality !== quality) {
          console.log('force to 360');
          console.log(this.player);

          this.player.setQuality(quality).then((quality) => {
            // quality was successfully set
            this._toastService.showToast(this.translate.instant(`Sorry the only available quality is ${quality}`), 'warning')
          }).catch(function (error) {
            switch (error.name) {
              case 'TypeError':
                // the quality selected is not valid
                console.log('force to error' + error);

                break;

              default:
                // some other error occurred
                console.log('force to error' + error);

                break;
            }
          });
        }
        // }


      }, 1000);
    });
  }

  collapse() {
    var verticalSideBar = document.querySelector(".vertical_nav");
    verticalSideBar.classList.toggle("vertical_nav__minify");
    var wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("wrapper__minify");
    var sidekickToggle = document.querySelector(".chapterListToggle");
    sidekickToggle.classList.toggle("minify");
    var footer = document.querySelector(".footer");
    footer.classList.toggle("wrapper__minify");
  }

  getUserData() {
    return localStorage.getItem('email')
  }
  openListOfLec() {
    var verticalSideBar = document.querySelector(".contentOfChapter");
    verticalSideBar.classList.toggle("all");
  }
}
