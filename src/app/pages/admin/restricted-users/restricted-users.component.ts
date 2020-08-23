import { StudentsService } from './../services/students/students.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-restricted-users',
  templateUrl: './restricted-users.component.html',
  styleUrls: ['./restricted-users.component.scss']
})
export class RestrictedUsersComponent implements OnInit {
  disableScroll: Boolean;
  bsValue;
  constructor(private _student: StudentsService) { }

  ngOnInit(): void {
    this._student.getRestrictedUsers({
      "mobile_no":"01009305067",
      "email":"",
      "first_name":"",
      "last_name":""
  }).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

    })
  }


}
