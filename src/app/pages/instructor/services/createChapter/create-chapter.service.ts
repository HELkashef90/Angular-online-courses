import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateChapterService {

  constructor(private httpClient: HttpClient) { }

  createChapter(chapterForm: Object) {
    return this.httpClient.post(environment._createChapter, chapterForm)
  }
}
