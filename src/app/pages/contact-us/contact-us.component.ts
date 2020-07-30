import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(public _auth : AuthService) {
    if (localStorage.getItem("authenticationToken")) {
      this._auth.authUser()
    }
   }

  ngOnInit(): void {
  }
  goToDashboard(){
    this._auth.redirectUserToDashboard()
  }
}
