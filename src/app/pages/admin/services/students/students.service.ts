import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  getEnrollmentStudents(page, size, mobile, email) {
    if (mobile) {
      return this.httpClient.get(environment._getEnrollmentStudents + '?page=' + page + '&size=' + size + '&mobile=' + mobile)
    }
    if (email) {
      return this.httpClient.get(environment._getEnrollmentStudents + '?page=' + page + '&size=' + size + '&email=' + email)
    }
    return this.httpClient.get(environment._getEnrollmentStudents + '?page=' + page + '&size=' + size)

  }

  approveStudentPayment(id) {
    return this.httpClient.put(environment._activeEnrollment + id, {})
  }
  rejectEnrolment(id) {
    return this.httpClient.put(environment._rejectEnrollment + id, {})
  }
}
