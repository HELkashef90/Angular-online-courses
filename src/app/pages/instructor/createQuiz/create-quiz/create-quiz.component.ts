import { AddQuestionsComponent } from './../add-questions/add-questions.component';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateCourseService } from '../../services/createCourse/create-course.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit, AfterViewChecked {
  isLinear = true;
  quizInfoForm: FormGroup;
  modalRef: BsModalRef;
  loading: boolean;
  instructorCourses: any;

  constructor(private _formBuilder: FormBuilder, private changeDetect: ChangeDetectorRef, private modalService: BsModalService,
    private _courseService: CreateCourseService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getCourses()

  }
  initForm() {
    this.quizInfoForm = this._formBuilder.group({
      courseId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(120)]],
      sort: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      passScore: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      time_of_exam: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });
  }
  getCourses() {
    this.loading = true;
    this._courseService.getCoursesByInstructor().subscribe(res => {
      this.loading = false
      this.instructorCourses = res
      console.log(res);
      // res['statusCodeValue'] === 200 ? this.instructorCourses = res['body']['content'] : null;
    }, err => {
      this.loading = false
      console.log(err);

    })
  }
  ngAfterViewChecked(): void {
    this.changeDetect.detectChanges();
  }
  openAddQuestionsModal() {
    this.modalRef = this.modalService.show(AddQuestionsComponent, {

      initialState: {
        data: { quizInfo: this.quizInfoForm.value },
        callback: (result) => {
          if (result) {

          } else {
            console.log('cancel');

          }
        },
      },
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false
    });
  }
}
