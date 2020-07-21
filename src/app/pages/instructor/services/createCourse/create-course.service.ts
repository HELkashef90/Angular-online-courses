import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  constructor(private httpClient: HttpClient) { }
  
  createCourse(courseForm: FormData) {
    return this.httpClient.post(environment._createCourse, courseForm)
  }
}
