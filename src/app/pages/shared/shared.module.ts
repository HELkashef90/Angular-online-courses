import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { NgxFeedbackModule } from 'ngx-feedback';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [SaveUrlPipe],
  imports: [
    CommonModule,
    NgxLinkifyjsModule,
    NgxFeedbackModule,
    ModalModule
  ],
  exports:[SaveUrlPipe,NgxLinkifyjsModule,NgxFeedbackModule]
})
export class SharedModule { }
