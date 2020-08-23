import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [SaveUrlPipe],
  imports: [
    CommonModule,
    NgxLinkifyjsModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()

  ],
  exports:[SaveUrlPipe,NgxLinkifyjsModule,BsDropdownModule,BsDatepickerModule]
})
export class SharedModule { }
