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


@NgModule({
  declarations: [
    InstructorComponent,
    InstructorCoursesComponent,
    HeaderComponent,
    SidebarComponent,
    CreateCourseComponent,
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
    MatStepperModule
  ]
})
export class InstructorModule { }
