import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxConfirmBoxModule } from 'ngx-confirm-box';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminStudentsAllCoursesComponent } from './admin-students-all-courses/admin-students-all-courses.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AdminInstructorsListComponent } from './admin-instructors-list/admin-instructors-list.component';
import { AdminConfirmCoursesComponent } from './admin-confirm-courses/admin-confirm-courses.component';
import { RestrictedUsersComponent } from './restricted-users/restricted-users.component';
import { AdvancedSearchPaymentStudentComponent } from './advanced-search-payment-student/advanced-search-payment-student.component';
import { ManagmentUserComponent } from './managment-user/managment-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import{AddChapterComponent}from './add-chapter/add-chapter.component';
import{AddLectureComponent}from './add-lecture/add-lecture.component';
import{CreateCourseComponent}from './create-course/create-course.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [AddLectureComponent,AddChapterComponent,CreateCourseComponent,AdminComponent, AdminSidebarComponent, AdminFooterComponent, AdminStudentsAllCoursesComponent, ConfirmComponent, AdminInstructorsListComponent, AdminConfirmCoursesComponent, RestrictedUsersComponent, AdvancedSearchPaymentStudentComponent, ManagmentUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
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
    NgxConfirmBoxModule,
    ModalModule,
    SharedModule,
    MatSliderModule,
    MatStepperModule,
    MatIconModule,

  ]
})
export class AdminModule { }
