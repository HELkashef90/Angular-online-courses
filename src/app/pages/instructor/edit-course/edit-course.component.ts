import { CreateCourseService } from './../services/createCourse/create-course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import Player from '@vimeo/player';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  @ViewChild('stepper') stepper
  @ViewChild('prevPromoVideo') prevPromoVideo


  isLinear = true;
  infoForm: FormGroup;
  promoForm: FormGroup;
  showInfoErrors: boolean = false;
  showPromoErrors: boolean = false;
  acceptedImagesEx = ['image/jpg', 'image/jpeg', 'image/png', 'image/jfif', 'image/gif']
  acceptedVideosEx = ['video/mp4'];
  selectedCoverImagePrev: string;
  selectedCoverImage: any;
  selectedVideoPrev: string;
  selectedVideo: any;
  loading: boolean = false;
  uploading: boolean = false;
  uploadingPercentage = 0;
  createCourseReq: any;
  selectedCourseToEdit: any;
  player: any;

  constructor(private _courseService: CreateCourseService, private _formBuilder: FormBuilder, private _toastService: ToastService,private router :Router) {
    this.selectedCourseToEdit = _courseService.selectedCourseToEdit
    _courseService.selectedCourseToEdit = ""
    console.log(this.selectedCourseToEdit);
  }

  ngOnInit() {
    this.initForms()


  }
  ngAfterViewInit() {
    this.initVimeoPromoVid()
  }
  initVimeoPromoVid() {
    let options = {
      id: this.selectedCourseToEdit.promotional_video_id
    }
    this.player = new Player(this.prevPromoVideo.nativeElement, options);
  }

  initForms() {
    this.infoForm = this._formBuilder.group({
      courseTitle: [this.selectedCourseToEdit.course_title, [Validators.required, Validators.maxLength(120)]],
      courseSubTitle: [this.selectedCourseToEdit.course_subtitle, [Validators.required, Validators.maxLength(120)]],
      courseDescription: [this.selectedCourseToEdit.course_description, [Validators.required]],
      // language: [this.selectedCourseToEdit, [Validators.required]],
      grade: [this.selectedCourseToEdit.level, [Validators.required]],
      subject: [this.selectedCourseToEdit.subjectName, [Validators.required]],
    });
    this.promoForm = this._formBuilder.group({
      coverImage: [''],
      promoVideo: [''],
    });
  }

  coverImageChange($event) {
    // console.log($event.target.files);
    this.selectedCoverImage = null;
    this.selectedCoverImagePrev = null;
    if ($event.target.files.length > 0 && this.checkImageEx($event.target.files[0]?.type.toLowerCase())) {
      this.loading = true;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.selectedCoverImagePrev = e.target.result.toString();
        this.loading = false;
      }
      reader.readAsDataURL($event.target.files[0]);
      this.selectedCoverImage = $event.target.files[0]
      return
    }
    this.checkImageEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast('File not supported', 'error')

  }
  checkImageEx(type) {
    return this.acceptedImagesEx.includes(type)
  }
  promoVideoChange($event) {
    // console.log($event.target.files);
    this.selectedVideo = null;
    this.selectedVideoPrev = null;
    if ($event.target.files.length > 0 && this.checkVideoEx($event.target.files[0]?.type.toLowerCase())) {
      this.loading = true;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.selectedVideoPrev = e.target.result.toString();
        this.loading = false;
      }
      reader.readAsDataURL($event.target.files[0]);
      this.selectedVideo = $event.target.files[0]
      return
    }
    this.checkVideoEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast('Video not supported', 'error')
    this.initVimeoPromoVid()
  }
  checkVideoEx(type) {
    return this.acceptedVideosEx.includes(type);
  }


  ////////////////////////////////////////////////////////////////////////
  onInfoFormNext(stepper) {
    // console.log(this.infoForm);
    this.showInfoErrors = false;
    if (this.infoForm.valid) {
      stepper.next()
    } else {
      this.showInfoErrors = true;
      window.scrollTo(0, 0);
    }
  }
  onSubmitForm(stepper) {
    // console.log(this.promoForm);
    this.showPromoErrors = false;
    if (this.infoForm.valid) {
      confirm("Are YOu Sure?") ? this.submitData() : null;
    } else {
      this.showPromoErrors = true;
      window.scrollTo(0, 0);
    }
  }
  submitData() {
    let courseForm = new FormData();
    courseForm.append('course', JSON.stringify(
      {
        "id": this.selectedCourseToEdit.id,
        "course_title": this.infoForm.get('courseTitle')?.value,
        "course_subtitle": this.infoForm.get('courseSubTitle')?.value,
        "course_description": this.infoForm.get('courseDescription')?.value,
        "languageId": this.infoForm.get('language')?.value,
        "levelId": this.infoForm.get('grade')?.value,
        "subjectNameID": this.infoForm.get('subject')?.value,
        // "num_of_chapters": 1,

      })
    )
    this.selectedCoverImage ? courseForm.append('coverFile', this.selectedCoverImage) : null;
    this.selectedVideo ? courseForm.append('videoFile', this.selectedVideo) : null;

    this.uploading = true;
    this.createCourseReq = this._courseService.updateCourse(courseForm)
      .subscribe(event => {
        // console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadingPercentage = Math.round(event.loaded / event.total * 100)
        } else if (event.type === HttpEventType.Response) {
          console.log(event);

          this.uploading = false;
          this.infoForm.reset();
          this.promoForm.reset();
          this.stepper.reset();
          this.uploadingPercentage = 0
          this._toastService.showToast("your course successfully updated, congratulations!", 'success')
          this.router.navigate(['/instructor/courses'])
        }
      }, err => {
        this.uploading = false;
        this.uploadingPercentage = 0
        this._toastService.showToast("Error while update course, please try again", 'error')
        console.log(err);
      })
  }
  onCancelUploadClick() {
    if (this.createCourseReq) {
      this.createCourseReq.unsubscribe()
      this.uploading = false;
      this.uploadingPercentage = 0
    }
  }
}
