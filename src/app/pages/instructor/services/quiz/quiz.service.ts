import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }


  publishQuiz(quizId: string) {
    return this.http.put(environment._publishQuiz, {quizId})
  }


  removeAnswer(currentQuestion: any, currentAnswer: any, quizId: string) {
    let body = {
      questionPosition: currentQuestion,
      quizId,
      answerPosition: currentAnswer
    }
    return this.http.put(environment._removeAnswer, body)
  }


  removeQuestion(currentQuestion: any, quizId: string) {
    let body = {
      questionPosition: currentQuestion,
      quizId
    }
    return this.http.put(environment._removeQuestion, body)
  }


  saveAnswerImg(formData: FormData) {
    return this.http.post(environment._saveAnswerImg, formData)
  }

  saveQuestionImg(formData: FormData) {
    return this.http.post(environment._saveQuestionImg, formData)

  }


  saveQuestion(questionBody: { questionTxt: any; answersArray: any; }) {
    return this.http.put(environment._saveQuestion, questionBody)
  }


  createNewQuiz(quizInfo) {
    return this.http.post(environment._createNewQuiz, quizInfo)
  }

}
