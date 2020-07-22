import { HandleGlobalHttpErrorsService } from './../handleGlobalHttpErrors/handle-global-http-errors.service';
// import { ToastControllerService } from './../toastController/toast-controller.service';

import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private _handleGlobalHttpErrorService: HandleGlobalHttpErrorsService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor", req);
    let authenticationToken = localStorage.getItem('authenticationToken') || "";
    let refreshToken = localStorage.getItem('refreshToken') || "";
    const modified = req.clone({ setHeaders: { authenticationToken, refreshToken }, withCredentials: true });
    return next.handle(modified).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        //global error handling
        this._handleGlobalHttpErrorService.handleError(error)
        return throwError(error);
      }));
  }

}