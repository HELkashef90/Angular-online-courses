import { SpinnerService } from './../../services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
  constructor(private _auth: AuthService, private _spinner: SpinnerService, private router: Router, private activatedRoute: ActivatedRoute,
    private _toast: ToastService, private translate: TranslateService) {
  }
  ngOnInit() {

    // this._spinner.showFullScreenSpinner()
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._spinner.showFullScreenSpinner()
    try {
      return this._auth.isLoggedInAuth().pipe(map(res => {
        // console.log(res);
        if (res['usertype'] === 2) {
          this._spinner.hideFullScreenSpinner()
          this._auth.setUserAuthenticated(res)
          return true
        } else {
          this._auth.redirectUserToDashboard(res['usertype'])
          this._toast.showToast(this.translate.instant("You are not authorized to view this Url", "warning"))
          this._spinner.hideFullScreenSpinner()
          return false;
        }
      }),

        catchError((err) => {
          console.log('err guard');
          this.router.navigate([''])
          this._spinner.hideFullScreenSpinner();
          return of(false);
        })
      )
    } catch (err) {
      // console.log(err);
      this.router.navigate([''])
      this._spinner.hideFullScreenSpinner()
      return false;
    }
  }
  handleError(err: any): import("rxjs").OperatorFunction<boolean | UrlTree, any> {
    // console.log(err);
    this.router.navigate([''])
    this._spinner.hideFullScreenSpinner();
    throw new Error(err);
  }

}
