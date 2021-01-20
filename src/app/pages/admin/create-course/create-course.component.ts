import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { CreateCourseService } from './../services/createCourse/create-course.service';
import { CreateCourseService } from './../../instructor/services/createCourse/create-course.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HttpEventType } from '@angular/common/http';
import { StudentsService } from '../services/students/students.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
interface Instructor {
  id: String;
  name: String;
}
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})


export class CreateCourseComponent implements OnInit {
  @ViewChild('stepper') stepper

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
  instructorsArray: Instructor[];

  constructor(private _formBuilder: FormBuilder, private _toastService: ToastService,
    private translate: TranslateService, private _createCourse: CreateCourseService, private _student: StudentsService) { }

  ngOnInit(): void {
    this.initForms()
    this.getAllIInstructors()
    this.initSearchDropMenu()
  }

  getAllIInstructors() {
    this.loading = true;
    this._student.advancedSearchGetInstructors().subscribe(res => {
      console.log(res);
      this.instructorsArray = res as Array<Instructor>
      // load the initial bank list
      console.log(this.instructorsArray );
      
      this.filteredInstructors.next(this.instructorsArray.slice());
      // this.loading = false;
    },
      err => {
        console.log(err);
        // this.loading = false;

      })

  }
  //search dropdown
  /** control for the MatSelect filter keyword */
  public instructorFilterCtrl: FormControl = new FormControl();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** list of banks filtered by search keyword */
  public filteredInstructors: ReplaySubject<Instructor[]> = new ReplaySubject<Instructor[]>(1);
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  initSearchDropMenu() {
    // set initial selection


    // listen for search field value changes
    this.instructorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterInstructors();
      });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredInstructors
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Instructor, b: Instructor) => a && b && a.id === b.id;
      });
  }

  protected filterInstructors() {
    console.log(this.instructorFilterCtrl.value);
    
    if (!this.instructorsArray) {
      return;
    }
    // get the search keyword
    let search = this.instructorFilterCtrl.value;
    if (!search) {
      this.filteredInstructors.next(this.instructorsArray.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredInstructors.next(
      this.instructorsArray.filter(instructor => instructor.name.toLowerCase().indexOf(search) > -1)
    );
  }

  ///end of search dropdown


  initForms() {
    this.infoForm = this._formBuilder.group({
      courseTitle: ['', [Validators.required, Validators.maxLength(120)]],
      courseSubTitle: ['', [Validators.required, Validators.maxLength(120)]],
      courseDescription: ['', [Validators.required]],
      language: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      instructorId: ['', [Validators.required]],

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
    this.checkImageEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast(this.translate.instant('File not supported'), 'error')

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
    this.checkVideoEx($event.target.files[0]?.type.toLowerCase()) ? null : this._toastService.showToast(this.translate.instant('File not supported'), 'error')
  }
  checkVideoEx(type) {
    return this.acceptedVideosEx.includes(type);
  }

  ////////////////////////////////////////////////////////////////////////
  onInfoFormNext(stepper) {
    console.log(this.infoForm);
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
        "course_title": this.infoForm.get('courseTitle')?.value,
        "course_subtitle": this.infoForm.get('courseSubTitle')?.value,
        "course_description": this.infoForm.get('courseDescription')?.value,
        "languageId": this.infoForm.get('language')?.value,
        "levelId": this.infoForm.get('grade')?.value,
        "subjectNameID": this.infoForm.get('subject')?.value,
        "instructorId": this.infoForm.get('instructorId')?.value,
        // "num_of_chapters": 1,

      })
    )
    courseForm.append('coverFile', this.selectedCoverImage)
    courseForm.append('videoFile', this.selectedVideo)
    this.uploading = true;
    this.createCourseReq = this._createCourse.createCourse(courseForm).subscribe(event => {
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
        this._toastService.showToast(this.translate.instant("your course successfully created, congratulations!"), 'success')
      }
    }, err => {
      this.uploading = false;
      this.uploadingPercentage = 0
      this._toastService.showToast(this.translate.instant("Error while creating course, please try again"), 'error')
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
