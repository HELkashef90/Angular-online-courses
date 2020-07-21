import { CreateLectureService } from './../services/createLecture/create-lecture.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast/toast.service';

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

  constructor(private _formBuilder: FormBuilder, private sanitizer: DomSanitizer, private _createLectureService: CreateLectureService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.initForm();
    //get courses
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
  onCourseSelect($event) {
    console.log($event.target.value);
    this.loading = true;
    this._createLectureService.getChaptersByCourseId($event.target.value).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.chapters = res
    }, err => {
      console.log(err);
      this.loading = false;

    })

  }
  onSaveClick() {
    this.showInfoErrors = false;
    if (this.lectureForm.valid) {
      this.submitData()
    } else {
      this.showInfoErrors = true;
      window.scrollTo(0, 0);
    }
  }
  submitData() {
    this.loading = true;
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

    this._createLectureService.createLecture(lectureForm).subscribe(res => {
      this.loading = false;
      console.log(res);

    }, err => {
      this.loading = false;
      console.log(err);

    })

  }
}
