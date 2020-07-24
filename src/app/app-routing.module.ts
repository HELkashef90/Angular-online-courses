import { LoginGuard } from './guards/login/login.guard';
import { InstructorGuard } from './guards/instructor/instructor.guard';
import { UserGuard } from './guards/user/user.guard';
import { InstructorCoursesComponent } from './pages/instructor/instructor-courses/instructor-courses.component';
import { InstructorComponent } from './pages/instructor/instructor.component';
import { CreateCourseComponent } from './pages/instructor/create-course/create-course.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    // canActivate:[LoginGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    // canActivate:[LoginGuard],
    component: SignupComponent
  },
  {
    path: "user",
    // canDeactivate:[UserGuard],
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  },
  {
    path: "instructor",
    // canActivate:[InstructorGuard],
    loadChildren: () => import('./pages/instructor/instructor.module').then(m => m.InstructorModule),
  },
  {
    path: "admin",
    children: [{
      //routed here

      //default route
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    }],

  },
  {
    path: '**',
    redirectTo: '', //404
    pathMatch: 'full'
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
