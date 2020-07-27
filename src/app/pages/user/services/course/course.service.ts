import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  getAllApproved(page, size) {
    // ?page=1&size=3
    return this.httpClient.get(environment._getAllApprovedCourses + '?page=' + page + '&size=' + size)
  }
  getCourse(id) {
    return this.httpClient.get(environment._getCourseById + id)
  }
  getChaptersByCourseId(courseId: string) {
    return this.httpClient.get(environment._getCourseChaptersByCourseIdStudent + courseId)
  }
  getEnrollmentCourse() {
    return this.httpClient.get(environment._getEnrollmentCourses)
  }

  getStudyCourse(id) {
    return this.httpClient.get(environment._getStudyCourse + id)
  }

}
