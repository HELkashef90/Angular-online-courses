import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleGlobalHttpErrorsService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.error('handle global error >> ', error);
  }
}
