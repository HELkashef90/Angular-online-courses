import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CreateCourseService } from './../../instructor/services/createCourse/create-course.service';
import { CreateChapterService } from './../../instructor/services/createChapter/create-chapter.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
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
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {
  loading: boolean = false
  instructorCourses: any;
  chapterForm: FormGroup
  showInfoErrors: boolean = false;
  chapters = [];
  editMode: boolean;
  selectedChapterToEdit: any;
  instructorsArray: Instructor[];

  constructor(private _formBuilder: FormBuilder, private _createChapterService: CreateChapterService, private _courseService: CreateCourseService,
    private _toastService: ToastService,
    private translate: TranslateService, private _student: StudentsService) { }

  ngOnInit(): void {
    //get instructor courses
    // this.getCourses()
    // this.getChaptersByInstructor()
    this.initForm()
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
  onSelectInstructor(event: MatOptionSelectionChange) {
    // console.log(this.chapterForm.get('instructorId')?.value);
    // console.log(event);
    event.isUserInput ? this.getCourses(event.source.value.toString()) : null;

    // this.getCourses(id.toString());
  }
  getChaptersByInstructor() {
    this.loading = true;
    this._createChapterService.getChapters().subscribe(res => {
      this.loading = false

      console.log(res);
      res['statusCodeValue'] === 200 ? this.chapters = res['body'] : null;


    }, err => {
      this.loading = false

      console.log(err);

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

  onSaveChapterClick() {
    // console.log(this.infoForm);
    this.showInfoErrors = false;
    if (this.chapterForm.valid) {
      //save chapter
      if (confirm('Are you sure?')) {
        this.editMode ? this.updateChapter() : this.createChapter()
      }

    } else {
      this.showInfoErrors = true;
      window.scrollTo(0, 0);
    }
  }

  createChapter() {
    this.loading = true;
    let chapterForm = {
      "courseId": this.chapterForm.get('course').value,
      "chapter_title": this.chapterForm.get('chapterTitle').value,
      "chapter_description": this.chapterForm.get('description').value,
      "chapter_fee": this.chapterForm.get('price').value,
      "chapter_sort_number": this.chapterForm.get('sort').value,
      "instructorId": this.chapterForm.get('instructorId')?.value,


    }
    this._createChapterService.createChapter(chapterForm).subscribe(res => {
      console.log(res);
      this._toastService.showToast(this.translate.instant("your chapter successfully created, congratulations!"), 'success')
      this.getChaptersByInstructor()
      this.chapterForm.reset()
      this.loading = false;

    }, err => {
      console.log(err);
      this._toastService.showToast(this.translate.instant("Error while creating chapter, please try again"), 'error')

      this.loading = false;

    })
  }
  updateChapter() {
    this.loading = true;
    let chapterForm = {
      "id": this.selectedChapterToEdit.id,
      "courseId": this.chapterForm.get('course').value,
      "chapter_title": this.chapterForm.get('chapterTitle').value,
      "chapter_description": this.chapterForm.get('description').value,
      "chapter_fee": this.chapterForm.get('price').value,
      "chapter_sort_number": this.chapterForm.get('sort').value
    }
    this._createChapterService.updateChapter(chapterForm).subscribe(res => {
      console.log(res);
      this._toastService.showToast(this.translate.instant("your chapter successfully updated, congratulations!"), 'success')

      this.chapterForm.reset()
      this.editMode = false;
      this.getChaptersByInstructor()
      this.loading = false;

    }, err => {
      console.log(err);
      this._toastService.showToast(this.translate.instant("Error while update chapter, please try again"), 'error')

      this.loading = false;

    })
  }
  initForm() {
    this.chapterForm = this._formBuilder.group({
      course: ['', [Validators.required]],
      chapterTitle: ['', [Validators.required, Validators.maxLength(120)]],
      sort: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      instructorId: ['', [Validators.required]],
    });
  }
  onEditChapterClick(chapter) {
    this.editMode = true;
    this.selectedChapterToEdit = chapter
    this.chapterForm.get('course').setValue(chapter.courseId);
    this.chapterForm.get('chapterTitle').setValue(chapter.chapter_title);
    this.chapterForm.get('description').setValue(chapter.chapter_description);
    this.chapterForm.get('price').setValue(chapter.chapter_fee);
    this.chapterForm.get('sort').setValue(chapter.chapter_sort_number);
    window.scrollTo(0, 0);

  }
  onDeleteChapterClick(chapter) {
    if (confirm('Are You Sure?')) {
      this._createChapterService.deleteChapter(chapter.id).subscribe(res => {
        console.log(res);
        this.getChaptersByInstructor()
      }, err => {
        console.log(err);
        if (err.status === 400) {
          this._toastService.showToast(this.translate.instant("this chapter contains lectures, can't be deleted"), "warning")

        }
      })
    }
  }
  onCancelEditChapterClick() {
    this.editMode = false;
    this.chapterForm.reset()
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

  ///end of search dropdown

}
