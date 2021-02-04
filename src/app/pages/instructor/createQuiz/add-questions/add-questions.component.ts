import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../../services/toast/toast.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatStepper } from '@angular/material/stepper';
import { cpuUsage } from 'process';

interface answer {
  txt: string,
  img: File,
  isCorrect: boolean
}
interface question {
  title: string,
  img: File,
  answers: Array<answer>
}
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  @Input('data') data
  @ViewChild('stepper') stepper: MatStepper
  isLinear = true;
  questionFormArray: Array<FormGroup> = []
  selectedQuestionImagePrev: string;

  answersImgPrevOBj = {
    0: {
      0: '',
      1: ''
    },
    1: {
      0: '',
      1: ''
    },
  }
  questionsImgPrevOBj = { 0: '' }
  questions: string[] = [];
  // questionArray: Array<question>

  constructor(public bsModalRef: BsModalRef, private _formBuilder: FormBuilder,
    private _toaster: ToastService,
    private translate: TranslateService,
    private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.data);
    this.init()
  }
  init() {
    this.addQuestion(0, true)
  }

  addQuestion(currentQuestion, isInit?: boolean) {
    if (isInit) {
      this.pushNewQuestion()
      return
    }
    let answers = <FormArray>this.questionFormArray[currentQuestion].get('answers.options');

    if (this.questionFormArray[currentQuestion].valid && answers.length > 1) {
      this.pushNewQuestion(true)
    } else {
      this._toaster.showToast(this.translate.instant("Please complete the current question to add new one"), "warning")
    }

  }
  pushNewQuestion(slideNext?) {
    this.questionFormArray.push(
      this._formBuilder.group({
        questionTxt: ['', Validators.required],
        questionImg: File,
        answers: this._formBuilder.group({ options: this._formBuilder.array([]) })
      })
    )
    this.addNewAnswer(this.questionFormArray.length - 1)
    this.addNewAnswer(this.questionFormArray.length - 1)
    this.answersImgPrevOBj[(this.questionFormArray.length - 1)] =
    {
      0: '',
      1: ''
    },
      setTimeout(() => {
        slideNext ? this.stepper.next() : null;
      }, 200);
  }

  removeQuestion(currentQuestion) {
    this.questionFormArray.splice(currentQuestion, 1)
    delete this.questionsImgPrevOBj[currentQuestion]
  }
  addNewAnswer(currentQuestion) {
    let answers = <FormArray>this.questionFormArray[currentQuestion].get('answers.options');
    answers.push(
      this._formBuilder.group({
        txt: ['', Validators.required],
        img: File,
        isCorrect: false
      })

    )
  }

  removeAnswer(currentQuestion, currentAnswer) {
    let answers = <FormArray>this.questionFormArray[currentQuestion].get('answers.options');
    if (answers.length < 3) {
      this._toaster.showToast(this.translate.instant("Minimum number of answers = 2"), "warning");
      return
    }
    answers.removeAt(currentAnswer);
    this.setPreviewAnswerImg(currentQuestion, currentAnswer, false, true)
  }
  decline() {
    this.bsModalRef.hide();
  }

  onQuestionImgChange($event, i) {
    this.questionFormArray[i].get('questionImg').setValue($event.srcElement.files[0])
    this.setPreviewQuestionImg($event, i)
  }
  onAnswerChange($event, q, a) {
    this.setPreviewAnswerImg(q, a, $event.srcElement.files[0])
    console.log(q, a);

    let answers = <FormArray>this.questionFormArray[q].get('answers.options');
    // if (answers.controls[a].get('img').value === $event.srcElement.files[0]) {
    //   return
    // }
    answers.controls[a].get('img').setValue($event.srcElement.files[0])
    // console.log(answers);
  }

  setPreviewQuestionImg($event, q) {
    if (!$event.srcElement.files[0]) {
      return
    }
    let reader = new FileReader();
    reader.onload = (e) => {
      this.questionsImgPrevOBj[q] = e.target.result.toString();
    }
    reader.readAsDataURL($event.srcElement.files[0]);
  }
  setPreviewAnswerImg(q, a, file?, remove?) {

    console.log(this.answersImgPrevOBj[q], a, remove);
    if (remove) {
      delete this.answersImgPrevOBj[q][a]
      console.log('remove', this.answersImgPrevOBj[q]);

      return
    }
    if (!file) {
      return
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // if (this.answersImgPrevOBj[q].includes(e.target.result.toString())) {
      //   this._toaster.showToast(this.translate.instant("Image already exist"), "warning");
      //   return
      // }
      this.answersImgPrevOBj[q][a] = (e.target.result.toString());
    }

  }
  console() {
    console.log(this.questionFormArray);
    this.questions = []
    for (let q = 0; q < this.questionFormArray.length; q++) {
      const element = this.questionFormArray[q];
      if (element.invalid) {
        this._toaster.showToast(this.translate.instant("Please complete/check your quiz again"), "warning");
        return
      }
      this.questions.push(this.questionFormArray[q].value)

    }
    let quiz = {
      desc: this.data,
      questions: this.questions
    }
    quiz.questions.push()

    const formData = new FormData()
    formData.append('quizInfo', JSON.stringify(this.data.quizInfo))
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i]['questionImg']?.size) {
        formData.append(`q${i}img`, this.questions[i]['questionImg'])
      }
      
    }
    this.http.post("createQuiz", formData).subscribe(res => {

    })
  }
}
