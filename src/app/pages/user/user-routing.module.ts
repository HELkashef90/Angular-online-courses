import { MyCoursesComponent } from './my-courses/my-courses.component';
import { UserStudyCourseComponent } from './user-study-course/user-study-course.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { UserViewCourseComponent } from './user-view-course/user-view-course.component';
import { UserAllCoursesComponent } from './user-all-courses/user-all-courses.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
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
      {
        path: 'viewCourse/:id',
        component: UserViewCourseComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path:'myCourses',
        component:MyCoursesComponent
      }      ,
      {
        path:'searchResult',
        component:SearchResultComponent
      },
      {
        path:'userFeedback',
        component:FeedbackComponent
      },
      {
        path:'PurchaseHistory',
        component:PurchaseHistoryComponent
      },
      {
        path:'Profile',
        component:UserProfileComponent
      },

    ]
  },
  {
    path: 'study/:courseId',
    component: UserStudyCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
