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
  getChapters() {
    return this.httpClient.get(environment._getChaptersByInstructor)
  }
  updateChapter(chapterForm) {
    return this.httpClient.put(environment._updateChapter, chapterForm)
  }
  deleteChapter(id) {
    return this.httpClient.delete(environment._deleteChapter + id)
  }
}
