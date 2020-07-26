import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {
  selectedCourseToEdit: any;

  constructor(private httpClient: HttpClient) { }

  createCourse(courseForm: FormData) {
    return this.httpClient.post(environment._createCourse, courseForm, {
      reportProgress: true,
      observe: 'events'
    })
  }
  getCourses() {
    return this.httpClient.get(environment._getCourses)
  }

  deleteCourse(id: any) {
    return this.httpClient.delete(environment._deleteCourse + id)
  }
  updateCourse(courseForm: FormData) {
    return this.httpClient.put(environment._updateCourse, courseForm,{
      reportProgress: true,
      observe: 'events'
    })
  }
  getCourse(id) {
    return this.httpClient.get(environment._getCourseById + id)
  }
  getChaptersByCourseId(courseId: string) {
    return this.httpClient.get(environment._getCourseChaptersByCourseIdStudent + courseId)
  }
}
