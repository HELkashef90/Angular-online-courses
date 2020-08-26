import { TranslateService } from '@ngx-translate/core';
import { CreateLectureService } from './../services/createLecture/create-lecture.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HttpEventType } from '@angular/common/http';
import { CreateCourseService } from '../services/createCourse/create-course.service';

@Component({
  selector: 'app-instructor-add-lecture',
  templateUrl: './instructor-add-lecture.component.html',
  styleUrls: ['./instructor-add-lecture.component.scss']
})
export class InstructorAddLectureComponent implements OnInit {
  loading: boolean = false;
  lectureForm: FormGroup;
  showInfoErrors: boolean = false;
  acceptedVideosEx = ['video/mp4'];
  videoUrl: any;
  videoDuration: any = '';
  chapters: any;
  selectedVideo: any;
  uploading: boolean = false;
  uploadingPercentage = 0;
  instructorCourses = [];
  createLecture: any;
  lectures: any;
  editMode: boolean;
  selectedLectureToEdit: any;

  constructor(private _formBuilder: FormBuilder, private sanitizer: DomSanitizer, private _createLectureService: CreateLectureService,
    private _toastService: ToastService,
    private _courseService: CreateCourseService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm();
    //get courses
    this.getCourses();
  }
  getCourses() {
    this.loading = true;
    this._courseService.getCourses(0,8).subscribe(res => {
      this.loading = false
      console.log(res['body']);
      res['statusCodeValue'] === 200 ? this.instructorCourses = res['body']['content'] : null;
    }, err => {
      this.loading = false
      console.log(err);


    })
  }
  getLectures() {
    this.loading = true

    this._createLectureService.getLectures().subscribe(res => {
      this.loading = false

      console.log(res);
      res['statusCodeValue'] === 200 ? this.lectures = res['body'] : null;


    }, err => {
      this.loading = false

      console.log(err);

    })
  }
  onCourseSelect($event) {
    console.log($event.target.value);
    this.getChapters($event.target.value)

  }
  getChapters(courseId) {
    this.loading = true;
    this.lectureForm.get('chapter').setValue('')
    this._createLectureService.getChaptersByCourseId(courseId).subscribe(res => {
      console.log(res);
      this.loading = false;
      console.log(res['body']);
      res['statusCodeValue'] === 200 ? this.chapters = res['body'] : null;
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

  initForm() {
    this.lectureForm = this._formBuilder.group({
      lectureTitle: ['', [Validators.required, Validators.maxLength(120)]],
      lectureFile: ['', [Validators.required]],
      sort: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      description: ['', [Validators.required]],
      course: ['', [Validators.required]],
      chapter: ['', [Validators.required]],
      active: [true, [Validators.required]],
      
    });
  }
  onFileChange($event) {
    this.selectedVideo = null
    this.videoDuration = 0
    console.log($event.target.files[0]);
    if ($event.target.files.length > 0 && this.checkVideoEx($event.target.files[0]?.type.toLowerCase())) {
      this.readVideoUrl($event.target.files[0])
      this.selectedVideo = $event.target.files[0]
    } else {
      this.checkVideoEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast(this.translate.instant('File not supported'), 'error')

    }
  }
  readVideoUrl(video) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(video));
  }
  getDuration(e) {
    this.videoDuration = Math.round(e.target.duration / 60);
  }
  checkVideoEx(type) {
    return this.acceptedVideosEx.includes(type);
  }

  onSaveClick() {
    this.showInfoErrors = false;
    if (this.lectureForm.valid) {
      if (confirm("Are YOu Sure?")) {
        this.editMode ? this.updateLecture() : this.submitData();
      }
    } else {
      this.showInfoErrors = true;
      window.scrollTo(0, 0);
    }
  }

  submitData() {

    let lectureForm = new FormData();
    lectureForm.append('chapterContent', JSON.stringify(
      {
        "courseChapter": this.lectureForm.get('chapter').value,
        "content_time_required_in_sec": this.videoDuration * 60,
        "content_title": this.lectureForm.get('lectureTitle').value,
        "content_description": this.lectureForm.get('description').value,
        "content_sort_number": this.lectureForm.get('sort').value,
        "is_active": this.lectureForm.get('active').value,

      })
    )
    lectureForm.append('videoFile', this.selectedVideo);

    this.uploading = true;
    this.createLecture = this._createLectureService.createLecture(lectureForm).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadingPercentage = Math.round(event.loaded / event.total * 100)
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
        this.getLectures();
        this.uploading = false;
        this.lectureForm.reset();
        this.uploadingPercentage = 0
        this._toastService.showToast(this.translate.instant("your lecture successfully created, congratulations!"), 'success')
      }
    }, err => {
      this.uploading = false;
      this.uploadingPercentage = 0
      this._toastService.showToast(this.translate.instant("Error while creating lecture, please try again"), 'error')
      console.log(err);
    })

  }
  updateLecture() {

    let lectureForm = new FormData();
    lectureForm.append('chapterContent', JSON.stringify(
      {
        "id": this.selectedLectureToEdit.id,
        "courseChapter": this.lectureForm.get('chapter').value,
        "content_title": this.lectureForm.get('lectureTitle').value,
        "content_description": this.lectureForm.get('description').value,
        "content_sort_number": this.lectureForm.get('sort').value,
        "is_active": this.lectureForm.get('active').value,

      })
    )
    // lectureForm.append('videoFile', this.selectedVideo);

    this.uploading = true;
    this.createLecture = this._createLectureService.updateLecture(lectureForm).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadingPercentage = Math.round(event.loaded / event.total * 100)
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
        this.getLectures();

        this.uploading = false;
        this.lectureForm.reset();
        this.uploadingPercentage = 0
        this._toastService.showToast(this.translate.instant("your lecture successfully updated!"), 'success')
      }
    }, err => {
      this.uploading = false;
      this.uploadingPercentage = 0
      this._toastService.showToast(this.translate.instant("Error while update lecture, please try again"), 'error')
      console.log(err);
    })
  }
  onCancelUploadClick() {
    if (this.createLecture) {
      this.createLecture.unsubscribe()
      this.uploading = false;
      this.uploadingPercentage = 0
    }
  }
  onEditLecture(lecture) {
    this.editMode = true;
    this.selectedLectureToEdit = lecture
    this.lectureForm.reset()
    this.lectureForm.get('lectureFile').clearValidators()
    this.lectureForm.get('lectureFile').updateValueAndValidity()

    this.lectureForm.get('course').setValue(lecture.courseId)
    this.getChapters(this.lectureForm.get('course').value)
    this.lectureForm.get('chapter').setValue('')
    this.lectureForm.get('lectureTitle').setValue(lecture.content_title)
    this.lectureForm.get('description').setValue(lecture.content_description)
    this.lectureForm.get('sort').setValue(lecture.content_sort_number)
    this.lectureForm.get('active').setValue(lecture.is_active)
  }
  onCancelEditChapterClick() {
    this.editMode = false;
    this.lectureForm.reset()
    this.lectureForm.get('lectureFile').setValidators([Validators.required])
    this.lectureForm.get('lectureFile').updateValueAndValidity()
  }
  onDeleteLecture(lecture) {
    if (confirm('Are You sure?')) {
      this._createLectureService.deleteLecture(lecture.id).subscribe(res => {
        console.log(res);
        this._toastService.showToast(this.translate.instant("your lecture successfully deleted!"), 'success')
        this.getLectures();
      }, err => {
        console.log(err);

      })
    }

  }


  onOffLectureClick(ev, lecture) {
    console.log(ev.target.checked);
    //true activate
    if (ev.target.checked) {
      this._createLectureService.activeLecture(lecture.id).subscribe(res => {
        console.log(res);
        this._toastService.showToast(this.translate.instant("your lecture successfully activated!"), 'success')

      },
        err => {
          console.log(err);
          this._toastService.showToast(this.translate.instant("please try again!"), 'error')
          ev.target.checked = false
        })
    }
    //false deactivate
    if (!ev.target.checked) {
      this._createLectureService.disableLecture(lecture.id).subscribe(res => {
        console.log(res);
        this._toastService.showToast(this.translate.instant("your lecture successfully disabled!"), 'success')

      },
        err => {
          console.log(err);
          this._toastService.showToast(this.translate.instant("please try again!"), 'error')
          ev.target.checked = true
        })
    }
  }
}
