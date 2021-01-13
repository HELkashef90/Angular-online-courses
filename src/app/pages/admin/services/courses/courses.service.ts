import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  getAllCourses(page, size, mobile, email) {
    if (mobile) {
      return this.httpClient.get(environment._getPendingCourses + '?page=' + page + '&size=' + size + '&mobile=' + mobile)
    }
    if (email) {
      return this.httpClient.get(environment._getPendingCourses + '?page=' + page + '&size=' + size + '&email=' + email)
    }
    return this.httpClient.get(environment._getPendingCourses + '?page=' + page + '&size=' + size)

  }


  approveCourse(id) {
    return this.httpClient.put(environment._approveCourse + id, {})
  }
  rejectCourse(id) {
    return this.httpClient.put(environment._rejectCourse + id, {})
  }
}
