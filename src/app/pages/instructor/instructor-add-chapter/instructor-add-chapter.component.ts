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


  constructor(private _formBuilder: FormBuilder, private _createChapterService: CreateChapterService, private _courseService: CreateCourseService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    //get instructor courses
    this.getCourses()
    this.initForm()
  }
  getCourses() {
    this._courseService.getCourses().subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

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
  onSaveChapterClick() {
    // console.log(this.infoForm);
    this.showInfoErrors = false;
    if (this.chapterForm.valid) {
      //save chapter
      this.createChapter()
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
    }
    this._createChapterService.createChapter(chapterForm).subscribe(res => {
      console.log(res);
      this._toastService.showToast("your chapter successfully created, congratulations!", 'success')

      this.chapterForm.reset()
      this.loading = false;

    }, err => {
      console.log(err);
      this._toastService.showToast("Error while creating chapter, please try again", 'error')

      this.loading = false;

    })
  }
}
