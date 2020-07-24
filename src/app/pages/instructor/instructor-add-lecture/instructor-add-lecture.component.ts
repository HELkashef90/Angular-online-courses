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
  instructorCourses: any;
  createLecture: any;
  lectures: any;

  constructor(private _formBuilder: FormBuilder, private sanitizer: DomSanitizer, private _createLectureService: CreateLectureService,
    private _toastService: ToastService,
    private _courseService: CreateCourseService) { }

  ngOnInit(): void {
    this.initForm();
    //get courses
    this.getCourses();
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
    this.loading = true;
    this._createLectureService.getChaptersByCourseId($event.target.value).subscribe(res => {
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
      sort: ['', [Validators.required]],
      description: ['', [Validators.required]],
      course: ['', [Validators.required]],
      chapter: ['', [Validators.required]],

    });
  }
  onFileChange($event) {
    console.log($event.target.files[0]);
    if ($event.target.files.length > 0 && this.checkVideoEx($event.target.files[0]?.type.toLowerCase())) {
      this.readVideoUrl($event.target.files[0])
      this.selectedVideo = $event.target.files[0]
    } else {
      this.checkVideoEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast('File not supported', 'error')

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
      confirm("Are YOu Sure?") ?  this.submitData() : null;
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
        "time_required_in_sec": this.videoDuration * 60,
        "content_title": this.lectureForm.get('lectureTitle').value,
        "description": this.lectureForm.get('description').value
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

        this.uploading = false;
        this.lectureForm.reset();
        this.uploadingPercentage = 0
        this._toastService.showToast("your lecture successfully created, congratulations!", 'success')
      }
    }, err => {
      this.uploading = false;
      this.uploadingPercentage = 0
      this._toastService.showToast("Error while creating lecture, please try again", 'error')
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
}
