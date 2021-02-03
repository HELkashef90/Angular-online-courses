import { CreateQuizComponent } from './createQuiz/create-quiz/create-quiz.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { InstructorAddLectureComponent } from './instructor-add-lecture/instructor-add-lecture.component';
import { InstructorAddChapterComponent } from './instructor-add-chapter/instructor-add-chapter.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { ConfirmLeaveGuard } from './../../guards/confirmLeave/confirm-leave.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CoursesPurchaseHistoryComponent } from './courses-purchase-history/courses-purchase-history.component';
import { FeedbackComponent } from './feedback/feedback.component';


const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        //default route
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'PurchaseHistory',
        component: CoursesPurchaseHistoryComponent
      },
      {
        path: 'createQuiz',
        component: CreateQuizComponent
      },


      {
        path: 'intructorFeedback',
        component: FeedbackComponent
      },

      {
        path: 'courses',
        component: InstructorCoursesComponent,
      },
      {
        path: 'viewCourse/:id',
        component:ViewCourseComponent
      },
      {
        path: 'create',
        // component: CreateCourseComponent,
        children: [
          {
            path: 'course',
            component: CreateCourseComponent,
            canDeactivate: [ConfirmLeaveGuard],

          },
          {
            path: 'chapter',
            component: InstructorAddChapterComponent,
            canDeactivate: [ConfirmLeaveGuard],

          },
          {
            path: 'lecture',
            component: InstructorAddLectureComponent,
            canDeactivate: [ConfirmLeaveGuard],

          },
          {
            path: '',
            redirectTo: 'course',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'dashboard',
        component: InstructorDashboardComponent
      }
          ],

  },
  {
    path: 'editCourse',
    component: EditCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
