import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUrlPipe } from 'src/app/pipes/saveUrl/save-url.pipe';



@NgModule({
  declarations: [SaveUrlPipe],
  imports: [
    CommonModule
  ],
  exports:[SaveUrlPipe]
})
export class SharedModule { }
