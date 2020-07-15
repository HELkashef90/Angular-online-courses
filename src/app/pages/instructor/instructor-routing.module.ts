import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';


const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        //default route
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
      },
      {
        path: 'courses',
        component: InstructorCoursesComponent,
      },
      {
        path: 'create',
        component: CreateCourseComponent
      },

    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
