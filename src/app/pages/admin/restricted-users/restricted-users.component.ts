import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-restricted-users',
  templateUrl: './restricted-users.component.html',
  styleUrls: ['./restricted-users.component.scss']
})
export class RestrictedUsersComponent implements OnInit {
  disableScroll: Boolean;
  bsValue ;
  constructor() { }

  ngOnInit(): void {
  }


}
