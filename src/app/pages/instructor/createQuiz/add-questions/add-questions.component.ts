import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  @Input('data') data
  isLinear = false
  constructor(public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  decline() {


    this.bsModalRef.hide();

  }
}
