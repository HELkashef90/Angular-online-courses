import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [SaveUrlPipe],
  imports: [
    CommonModule,
    NgxLinkifyjsModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    InfiniteScrollModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports:[SaveUrlPipe,NgxLinkifyjsModule,BsDropdownModule,BsDatepickerModule,InfiniteScrollModule,NgxMatSelectSearchModule,MatSelectModule,
    MatFormFieldModule,]
})
export class SharedModule { }
