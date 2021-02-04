import { QuizService } from './../../services/quiz/quiz.service';
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
  loading = true;
  quizId: string = 'quizId';
  // questionArray: Array<question>

  constructor(public bsModalRef: BsModalRef, private _formBuilder: FormBuilder,
    private _toaster: ToastService,
    private translate: TranslateService,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.createQuiz(this.data.quizInfo)
    this.init()
  }
  createQuiz(quizInfo: any) {
    console.error('please return the quiz id')
    this._quiz.createNewQuiz(quizInfo).subscribe(res => {
      this.quizId = res
      this.loading = false;

    },
      err => {
        this._toaster.showToast(this.translate.instant("Error creating new quiz"), "error");
        this.loading = false;
        this.decline()

      })
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
      this.saveQuestion(this.questionFormArray[currentQuestion], answers, currentQuestion)
    } else {
      this._toaster.showToast(this.translate.instant("Please complete the current question to add new one"), "warning")
    }

  }

  saveQuestion(question: FormGroup, answers: FormArray, position) {

    this.loading = true;
    let questionTxt = question?.value?.questionTxt
    let answersArray = answers?.value
    console.log(questionTxt, answersArray);

    let questionBody = {
      questionTxt,
      answersArray,
      quizId: this.quizId,
      position
    }

    this._quiz.saveQuestion(questionBody).subscribe(res => {
      //if saved successfully
      this.pushNewQuestion(true)
      this.loading = false;
    }, err => {
      this._toaster.showToast(this.translate.instant("Error creating save question, try again"), "error");
      this.loading = false;

    })


  }
  pushNewQuestion(slideNext?) {


    this.questionFormArray.push(
      this._formBuilder.group({
        questionTxt: ['', Validators.required],
        questionImg: '',
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
    this.loading = true;
    this._quiz.removeQuestion(currentQuestion, this.quizId).subscribe(res => {
      this.questionFormArray.splice(currentQuestion, 1)
      delete this.questionsImgPrevOBj[currentQuestion]
      this.loading = false;
    }, err => {
      this._toaster.showToast(this.translate.instant("Error remove question, try again"), "error");
      this.loading = false;


    })

  }
  addNewAnswer(currentQuestion) {
    let answers = <FormArray>this.questionFormArray[currentQuestion].get('answers.options');
    answers.push(
      this._formBuilder.group({
        txt: ['', Validators.required],
        img: '',
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
    this.loading = true;
    this._quiz.removeAnswer(currentQuestion, currentAnswer, this.quizId).subscribe(res => {
      answers.removeAt(currentAnswer);
      this.setPreviewAnswerImg(currentQuestion, currentAnswer, false, true);
      this.loading = false;

    }, err => {
      this._toaster.showToast(this.translate.instant("Error remove the answer, try again"), "error");
      this.loading = false;

    })

  }


  onQuestionImgChange($event, i) {
    if ($event.srcElement.files[0]) {
      this.saveQuestionImg($event.srcElement.files[0], i)
    }
  }
  saveQuestionImg(image: File, position) {
    this.loading = true;

    let formData = new FormData();

    formData.append('img', image);
    formData.append('position', position);
    formData.append('quizId', this.quizId);

    this._quiz.saveQuestionImg(formData).subscribe(res => {
      this.questionFormArray[position].get('questionImg').setValue(image)
      this.setPreviewQuestionImg(image, position)
      this.loading = false;

    }, err => {
      this._toaster.showToast(this.translate.instant("Error save question image, try again"), "error");

      this.loading = false;

    })
  }
  onAnswerChange($event, q, a) {
    if ($event.srcElement.files[0]) {
      this.saveAnswerImg($event.srcElement.files[0], q, a)
    }
  }
  saveAnswerImg(image: File, position: any, a: any) {
    this.loading = true;

    let formData = new FormData();

    formData.append('img', image);
    formData.append('questionPosition', position);
    formData.append('answerPosition', a);
    formData.append('quizId', this.quizId);

    this._quiz.saveAnswerImg(formData).subscribe(res => {

      this.setPreviewAnswerImg(position, a, image)
      this.questionFormArray[position].get('questionImg').setValue(image)
      let answers = <FormArray>this.questionFormArray[position].get('answers.options');
      answers.controls[a].get('img').setValue(image)

      this.loading = false;

    }, err => {
      this._toaster.showToast(this.translate.instant("Error save answer image, try again"), "error");

      this.loading = false;

    })
  }

  setPreviewQuestionImg(image, q) {
    if (image) {
      return
    }
    let reader = new FileReader();
    reader.onload = (e) => {
      this.questionsImgPrevOBj[q] = e.target.result.toString();
    }
    reader.readAsDataURL(image);
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
  publishQuiz() {
    console.log(this.questionFormArray);

    if (!this.checkQuiz()) {
      return
    }

    this.loading = true;
    this._quiz.publishQuiz(this.quizId).subscribe(res => {
      this._toaster.showToast(this.translate.instant("Published"), "success");

      this.loading = false;
    }, err => {
      this._toaster.showToast(this.translate.instant("Error while publish your qui, try again"), "error");

      this.loading = false;

    })
  }

  checkQuiz() {
    this.questions = []
    for (let q = 0; q < this.questionFormArray.length; q++) {
      const element = this.questionFormArray[q];
      if (element.invalid) {
        this._toaster.showToast(this.translate.instant("Please complete/check your quiz again"), "warning");
        return false
      }
      this.questions.push(this.questionFormArray[q].value)
      return true

    }
  }
  decline(test = true) {
    if (test) {
      return
    }
    this.bsModalRef.hide();
  }
  close() {
    this.bsModalRef.hide();

  }
}
