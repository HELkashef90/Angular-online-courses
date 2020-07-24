import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { UserAllCoursesComponent } from './user-all-courses/user-all-courses.component';
import { UserViewCourseComponent } from './user-view-course/user-view-course.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserStudyCourseComponent } from './user-study-course/user-study-course.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';


@NgModule({
  declarations: [UserComponent, UserHeaderComponent, UserSidebarComponent, UserFooterComponent, UserDashboardComponent, UserAllCoursesComponent, UserViewCourseComponent, CartComponent, CheckoutComponent, UserStudyCourseComponent
  ,SaveUrlPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule ,
    // BrowserModule,
    // AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    NgxLoadingModule,
    TranslateModule,
    ToastrModule,
    InfiniteScrollModule
  ]
})
export class UserModule { }
