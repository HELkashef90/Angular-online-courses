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

  getRestrictedUsers(page, size, body = {}) {
    return this.httpClient.post(environment._getRestrictedUsers + '?page=' + page + '&size=' + size, body)
  }

  unblockUSer(id) {
    return this.httpClient.put(environment._unblockUSer + id, {})
  }
  blockUSer(id) {
    return this.httpClient.put(environment._blockUSer + id, {})
  }
  advancedSearchEnrollment(page, size, body = {}) {
    return this.httpClient.post(environment._advancedSearchEnrollment + '?page=' + page + '&size=' + size, body)
  }
  advancedSearchGetCourses() {
    return this.httpClient.get(environment._advancedSearchGetCourses)
  }
  advancedSearchGetInstructors() {
    return this.httpClient.get(environment._advancedSearchGetInstructors)
  }
  advancedSearchGetChaptersByCourse(id) {
    return this.httpClient.get(environment._advancedSearchGetChaptersByCourse + id)
  }
  deleteEnrollmentRequest(id) {
    return this.httpClient.delete(environment._deleteEnrolmentRequest + id)
  }

  searchUsers(page, size, body = {}) {
    return this.httpClient.post(environment._userManagementSearchUsers + '?page=' + page + '&size=' + size, body)
  }
  activeUser(id) {
    return this.httpClient.put(environment._userManagementActiveUser + id , {})
  }
  deActivateUser(id) {
    return this.httpClient.put(environment._userManagementDeactivateUser + id , {})
  }
  blockUser(id) {
    return this.httpClient.get(environment._userManagementBlockUser + id)
  }
  unBlockUser(id) {
    return this.httpClient.get(environment._userManagementUnBlockUser + id)
  }
  resetPassword(id) {
    return this.httpClient.post(environment._userManagementResetPassword + id,{})
  }
  resetDevice(id) {
    return this.httpClient.put(environment._userManagementResetDevice + id,{})
  }
  updateUserInfo(body) {
    return this.httpClient.put(environment._userManagementUpdateInfo, body)
  }
}
