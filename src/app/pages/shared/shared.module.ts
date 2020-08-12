import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [SaveUrlPipe],
  imports: [
    CommonModule,
    NgxLinkifyjsModule,
    ModalModule
  ],
  exports:[SaveUrlPipe,NgxLinkifyjsModule]
})
export class SharedModule { }
