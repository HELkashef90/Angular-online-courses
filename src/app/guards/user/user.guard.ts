import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private _auth: AuthService, private _spinner: SpinnerService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      this._spinner.showFullScreenSpinner()
      return this._auth.isLoggedInAuth().pipe(map(res => {
        console.log(res);
        if (res['usertype'] === 1) {
          this._spinner.hideFullScreenSpinner()
          this._auth.setUserAuthenticated(res)
          return true
        } else {
          this.router.navigate(['login'])
          this._spinner.hideFullScreenSpinner()
          return false;
        }
      }),

        catchError((err) => {
          console.log(err);
          this.router.navigate(['login'])
          this._spinner.hideFullScreenSpinner();
          return of(false);
        })
      )
    } catch (err) {
      console.log(err);
      this.router.navigate(['login'])
      this._spinner.hideFullScreenSpinner()
      return false;
    }
  }
  handleError(err: any): import("rxjs").OperatorFunction<boolean | UrlTree, any> {
    console.log(err);
    this.router.navigate(['login'])
    this._spinner.hideFullScreenSpinner();
    throw new Error(err);
  }

}
