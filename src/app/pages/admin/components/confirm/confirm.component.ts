import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  prompt: any
  amount:any
  list = []
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    // console.log(this.amount , this.prompt);
    
  }

  confirm() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback(true);
      this.bsModalRef.hide();
    }
  }

  decline() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback(false);
      this.bsModalRef.hide();
    }
  }

}
