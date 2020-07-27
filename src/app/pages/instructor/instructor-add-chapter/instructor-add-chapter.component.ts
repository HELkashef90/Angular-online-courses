import { TranslateService } from '@ngx-translate/core';
import { CreateCourseService } from './../services/createCourse/create-course.service';
import { CreateChapterService } from './../services/createChapter/create-chapter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-instructor-add-chapter',
  templateUrl: './instructor-add-chapter.component.html',
  styleUrls: ['./instructor-add-chapter.component.scss']
})
export class InstructorAddChapterComponent implements OnInit {
  loading: boolean = false
  instructorCourses: any;
  chapterForm: FormGroup
  showInfoErrors: boolean = false;
  chapters = [];
  editMode: boolean;
  selectedChapterToEdit: any;


  constructor(private _formBuilder: FormBuilder, private _createChapterService: CreateChapterService, private _courseService: CreateCourseService,
    private _toastService: ToastService,
    private translate : TranslateService) { }

  ngOnInit(): void {
    //get instructor courses
    this.getCourses()
    // this.getChaptersByInstructor()
    this.initForm()
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
  getCourses() {
    this.loading = true;
    this._courseService.getCourses().subscribe(res => {
      this.loading = false
      console.log(res['body']);
      res['statusCodeValue'] === 200 ? this.instructorCourses = res['body']['content'] : null;
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
      "chapter_sort_number" : this.chapterForm.get('sort').value

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
      "chapter_sort_number" : this.chapterForm.get('sort').value
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
      sort: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }
  onEditChapterClick(chapter) {
    this.editMode = true;
    this.selectedChapterToEdit = chapter
    this.chapterForm.get('course').setValue(chapter.courseId);
    this.chapterForm.get('chapterTitle').setValue(chapter.chapter_title);
    this.chapterForm.get('description').setValue(chapter.chapter_description);
    this.chapterForm.get('price').setValue(chapter.chapter_fee);
    window.scrollTo(0, 0);

  }
  onDeleteChapterClick(chapter) {
    if (confirm('Are You Sure?')) {
      this._createChapterService.deleteChapter(chapter.id).subscribe(res => {
        console.log(res);
        this.getChaptersByInstructor()
      }, err => {
        console.log(err);
        if(err.status === 400){
          this._toastService.showToast(this.translate.instant("this chapter contains lectures, can't be deleted"),"warning")

        }
      })
    }
  }
  onCancelEditChapterClick() {
    this.editMode = false;
    this.chapterForm.reset()
  }
}
