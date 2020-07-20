import { CreateCourseService } from './../createCourse/create-course.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
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
  constructor(private _formBuilder: FormBuilder, private _toastService: ToastService,
    private _createCourse: CreateCourseService) { }


  ngOnInit() {
    this.initForms()
  }
  initForms() {
    this.infoForm = this._formBuilder.group({
      courseTitle: ['', [Validators.required, Validators.maxLength(120)]],
      courseSubTitle: ['', [Validators.required, Validators.maxLength(120)]],
      courseDescription: ['', [Validators.required, Validators.maxLength(120)]],
      language: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      subject: ['', [Validators.required]],
    });
    this.promoForm = this._formBuilder.group({
      coverImage: ['', Validators.required],
      promoVideo: ['', Validators.required],
    });
  }
  hasUnsavedData() {
    return true;
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
    this.checkVideoEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast('File not supported', 'error')
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
    if (this.promoForm.valid && this.infoForm.valid) {
      this.submitData()
    } else {
      this.showPromoErrors = true;
      window.scrollTo(0, 0);
    }
  }
  submitData() {
    // console.log(JSON.stringify(
    //   {
    //     "course_title": this.infoForm.get('courseTitle')?.value,
    //     "course_subtitle": this.infoForm.get('courseSubTitle')?.value,
    //     "course_description": this.infoForm.get('courseDescription')?.value,
    //     "languageId": this.infoForm.get('language')?.value,
    //     "levelId": this.infoForm.get('grade')?.value,
    //     "subjectNameID": this.infoForm.get('subject')?.value
    //   })
    // )

    let courseForm = new FormData();
    courseForm.append('course', JSON.stringify(
      {
        "course_title": this.infoForm.get('courseTitle')?.value,
        "course_subtitle": this.infoForm.get('courseSubTitle')?.value,
        "course_description": this.infoForm.get('courseDescription')?.value,
        "languageId": this.infoForm.get('language')?.value,
        "levelId": this.infoForm.get('grade')?.value,
        "subjectNameID": this.infoForm.get('subject')?.value
      })
    )
    courseForm.append('coverFile', this.selectedCoverImage)
    courseForm.append('videoFile', this.selectedVideo)
    console.log(courseForm);
    this._createCourse.createCourse(courseForm).subscribe(res => {
      console.log(res);

    }, err => {

      console.log(err);
    })
  }
}
