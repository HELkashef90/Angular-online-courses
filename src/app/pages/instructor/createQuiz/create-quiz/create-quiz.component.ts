import { AddQuestionsComponent } from './../add-questions/add-questions.component';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit, AfterViewChecked{
  isLinear = false;
  quizInfoForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private _formBuilder: FormBuilder, private changeDetect: ChangeDetectorRef,private modalService: BsModalService,
    ) { }

  ngOnInit(): void {
    this.quizInfoForm = this._formBuilder.group({
      course: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(120)]],
      sort: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      passScore: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      time: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });
  }
  ngAfterViewChecked(): void {
    this.changeDetect.detectChanges();
  }
  openAddQuestionsModal() {
    this.modalRef = this.modalService.show(AddQuestionsComponent, {
    
      initialState: {
        data: {quizInfo: this.quizInfoForm.value},
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
