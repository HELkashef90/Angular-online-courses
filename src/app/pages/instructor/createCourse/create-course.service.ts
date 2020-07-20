import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  constructor(private httpClient: HttpClient) { }
  
  createCourse(courseForm: FormData) {
    return this.httpClient.post(environment._createCourse, courseForm)
  }
}
