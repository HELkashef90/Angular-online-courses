import { ConfirmLeaveGuard } from './guards/confirmLeave/confirm-leave.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/instructor/components/header/header.component';
import { SidebarComponent } from './pages/instructor/components/sidebar/sidebar.component';
import { CreateCourseComponent } from './pages/instructor/create-course/create-course.component';
import { InstructorCoursesComponent } from './pages/instructor/instructor-courses/instructor-courses.component';
import { MatSliderModule } from '@angular/material/slider';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SaveUrlPipe } from './pipes/saveUrl/save-url.pipe';
import { NgxConfirmBoxModule, NgxConfirmBoxService } from 'ngx-confirm-box';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AfterSignupComponent } from './pages/after-signup/after-signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { IDMPageComponent } from './pages/idmpage/idmpage.component';
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { ExportConfirmationComponent } from './components/export-confirmation/export-confirmation.component';
import { ExportAsModule } from 'ngx-export-as';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from './pages/success/success.component';
import { FailedPageComponent } from './pages/failed-page/failed-page.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    SignupComponent,
    ActiveAccountComponent,
    ForgotPasswordComponent,
    AfterSignupComponent,
    ResetPasswordComponent,
    ContactUsComponent,
    IDMPageComponent,
    ExportConfirmationComponent,
    SuccessComponent,
    FailedPageComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    // environment.production
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,

    }), // ToastrModule added
    TranslateModule.forRoot(

      {
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        },
      },
    ),
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    MatSliderModule,
    InfiniteScrollModule,
    NgxConfirmBoxModule,
    ModalModule.forRoot(),
    NgxLinkifyjsModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    ExportAsModule,
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfirmLeaveGuard,
    NgxConfirmBoxService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
