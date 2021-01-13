import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [SaveUrlPipe],
  imports: [
    CommonModule,
    NgxLinkifyjsModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    InfiniteScrollModule,
  ],
  exports:[SaveUrlPipe,NgxLinkifyjsModule,BsDropdownModule,BsDatepickerModule,InfiniteScrollModule]
})
export class SharedModule { }
