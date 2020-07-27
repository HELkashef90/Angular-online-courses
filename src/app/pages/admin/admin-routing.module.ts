import { AdminConfirmCoursesComponent } from './admin-confirm-courses/admin-confirm-courses.component';
import { AdminInstructorsListComponent } from './admin-instructors-list/admin-instructors-list.component';
import { AdminStudentsAllCoursesComponent } from './admin-students-all-courses/admin-students-all-courses.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'students',
        component: AdminStudentsAllCoursesComponent
      },
      {
        path: 'instructors',
        component: AdminInstructorsListComponent
      },
      {
        path: "courses",
        component: AdminConfirmCoursesComponent
      },
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
