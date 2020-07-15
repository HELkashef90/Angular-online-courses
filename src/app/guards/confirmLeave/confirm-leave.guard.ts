import { CreateCourseComponent } from './../../pages/instructor/create-course/create-course.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeaveGuard implements CanDeactivate<CreateCourseComponent> {
  canDeactivate(component: CreateCourseComponent): boolean {
   
    if(component.hasUnsavedData()){
        if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}