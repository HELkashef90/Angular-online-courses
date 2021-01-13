import { CoursesPurchaseHistoryComponent } from './courses-purchase-history/courses-purchase-history.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { InstructorComponent } from './instructor.component';
import { RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { InstructorAddChapterComponent } from './instructor-add-chapter/instructor-add-chapter.component';
import { InstructorAddLectureComponent } from './instructor-add-lecture/instructor-add-lecture.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { NgxConfirmBoxModule } from 'ngx-confirm-box';
import { ViewCourseComponent } from './view-course/view-course.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    InstructorComponent,
    InstructorCoursesComponent,
    HeaderComponent,
    SidebarComponent,
    CreateCourseComponent,
    InstructorDashboardComponent,
    FooterComponent,
    InstructorAddChapterComponent,
    InstructorAddLectureComponent,
    EditCourseComponent,
    ViewCourseComponent,
    CoursesPurchaseHistoryComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
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
    MatSliderModule,
    MatStepperModule,
    MatIconModule,
    NgxConfirmBoxModule,
    SharedModule
  ]
})
export class InstructorModule { }
