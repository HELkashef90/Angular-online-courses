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
    this._student.getRestrictedUsers({}).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

    })
  }
  Search(){
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.toggle("shoow");
      }
  displaySearchSeaction(){
    var verticalSideBar = document.querySelector(".searchSection");
    verticalSideBar.classList.toggle("shoow");
  }

}
