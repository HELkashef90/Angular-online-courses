import { from } from 'rxjs';
import { AdminConfirmCoursesComponent } from './admin-confirm-courses/admin-confirm-courses.component';
import { AdminInstructorsListComponent } from './admin-instructors-list/admin-instructors-list.component';
import { AdminStudentsAllCoursesComponent } from './admin-students-all-courses/admin-students-all-courses.component';
import{RestrictedUsersComponent}from './restricted-users/restricted-users.component';
import{AdvancedSearchPaymentStudentComponent}from './advanced-search-payment-student/advanced-search-payment-student.component'
import{AddChapterComponent}from './add-chapter/add-chapter.component';
import{AddLectureComponent}from './add-lecture/add-lecture.component';
import{CreateCourseComponent}from './create-course/create-course.component';
import{ManagmentUserComponent}from './managment-user/managment-user.component';
import{EditUserComponent}from './edit-user/edit-user.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { ConfirmLeaveGuard } from './../../guards/confirmLeave/confirm-leave.guard';
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
        path:"restricted",
        component:RestrictedUsersComponent
      },
      {
        path:"advancedSearch",
        component:AdvancedSearchPaymentStudentComponent
      },
      {
        path:"Management",
        component:ManagmentUserComponent
      },
      {
        path:"EditUser",
        component:EditUserComponent
      },
      {
        path: 'chapter',
        component: AddChapterComponent},
      {
        path: 'course',
        component: CreateCourseComponent},

          {
            path: 'lecture',
            component: AddLectureComponent},

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
