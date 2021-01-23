import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CreateLectureService } from './../../instructor/services/createLecture/create-lecture.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HttpEventType } from '@angular/common/http';
import { CreateCourseService } from './../../instructor/services/createCourse/create-course.service';
import { StudentsService } from '../services/students/students.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core/option';
interface Instructor {
  id: String;
  name: String;
}
@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {
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
  instructorCourses: any
  createLecture: any;
  lectures: any;
  editMode: boolean;
  selectedLectureToEdit: any;
  instructorsArray: Instructor[];

  constructor(private _formBuilder: FormBuilder, private sanitizer: DomSanitizer, private _createLectureService: CreateLectureService,
    private _toastService: ToastService,
    private _courseService: CreateCourseService,
    private translate: TranslateService, private _student: StudentsService) { }

  ngOnInit(): void {
    this.initForm();
    //get courses
    // this.getCourses();
    this.getAllIInstructors()
    this.initSearchDropMenu()
  }
  getAllIInstructors() {
    this.loading = true;
    this._student.advancedSearchGetInstructors().subscribe(res => {
      console.log(res);
      this.instructorsArray = res as Array<Instructor>
      // load the initial bank list
      console.log(this.instructorsArray);

      this.filteredInstructors.next(this.instructorsArray.slice());
      this.loading = false;
    },
      err => {
        console.log(err);
        this.loading = false;

      })

  }
  getCourses(id) {
    this.loading = true;
    this._courseService.getAllCoursesByInstructorId(id).subscribe(res => {
      this.loading = false
      this.instructorCourses = res
      console.log(res);
      // res['statusCodeValue'] === 200 ? this.instructorCourses = res['body']['content'] : null;
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
      instructorId: ['', [Validators.required]],


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
        "instructorId": this.lectureForm.get('instructorId')?.value,


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
    // console.log(this.instructorFilterCtrl.value);

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
  onSelectInstructor(event: MatOptionSelectionChange) {
    // console.log(this.chapterForm.get('instructorId')?.value);
    // console.log(event);
    event.isUserInput ? this.getCourses(event.source.value.toString()) : null;

    // this.getCourses(id.toString());
  }
  ///end of search dropdown
}
