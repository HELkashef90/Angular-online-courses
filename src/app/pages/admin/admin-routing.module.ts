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
