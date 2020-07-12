// import { ToastControllerService } from './../toastController/toast-controller.service';

import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { throwError } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  
  constructor(
    private router: Router, 
    // private _toastService: ToastControllerService,
    private _authService : AuthService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modified = req.clone({setHeaders: {'oam_userid': 'hadeerInterceptor:)' , 'oam_BillProfileId':"hadeer2:)" , "oam_CustAccId" : "hadeer3"}});
    return next.handle(modified).pipe(
            retry(0),
            catchError((error: HttpErrorResponse) => {
              if(error.status == 401)
              {
                // this._authService.setUserUnAuthenticated();
                // this.router.navigateByUrl('auth');
              }
              return throwError(error.message);
            })
          );
}
}