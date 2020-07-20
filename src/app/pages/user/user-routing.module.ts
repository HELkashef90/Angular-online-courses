import { UserViewCourseComponent } from './user-view-course/user-view-course.component';
import { UserAllCoursesComponent } from './user-all-courses/user-all-courses.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: UserDashboardComponent
      },
      {
        path: 'courses',
        component: UserAllCoursesComponent
      },
    ]
  },
  {
    path: 'viewCourse/:id',
    component:UserViewCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
