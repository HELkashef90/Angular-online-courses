import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateLectureService {

  constructor(private httpClient: HttpClient) { }

  getChaptersByCourseId(courseId: string) {
    return this.httpClient.get(environment._getChaptersByCourseId + courseId)
  }
  createLecture(lectureForm: FormData) {
    return this.httpClient.post(environment._createLecture, lectureForm)
  }
}
