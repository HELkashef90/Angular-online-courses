import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor( private translate: TranslateService,public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  decline() {


    this.bsModalRef.hide();

  }
}
