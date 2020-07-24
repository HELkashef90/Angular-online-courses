import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  constructor(public _auth: AuthService) { }

  ngOnInit(): void {
  }
  logOut() {
    this._auth.signOut()
  }
}
