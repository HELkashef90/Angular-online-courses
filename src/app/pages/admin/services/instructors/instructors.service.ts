import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private httpClient: HttpClient) { }

  getAllInstructors(page, size, mobile, email) {
    if (mobile) {
      return this.httpClient.get(environment._getAllInstructors + '?page=' + page + '&size=' + size + '&mobile=' + mobile)
    }
    if (email) {
      return this.httpClient.get(environment._getAllInstructors + '?page=' + page + '&size=' + size + '&email=' + email)
    }
    return this.httpClient.get(environment._getAllInstructors + '?page=' + page + '&size=' + size)

  }


  approveInstructor(id) {
    return this.httpClient.put(environment._approveInstructor + id, {})
  }
  rejectInstructor(id) {
    return this.httpClient.put(environment._rejectInstructor + id, {})
  }
}
