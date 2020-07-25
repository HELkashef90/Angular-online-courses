import { LocalizationService } from './../../../../services/localization/localization.service';
import { CartService } from './../../services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  constructor(public _auth: AuthService,
    public cart : CartService,
   public _local : LocalizationService) { }

  ngOnInit(): void {
  }
  logOut() {
    this._auth.signOut()
  }
  getName() {
    return localStorage.getItem('username')
  }
  getEmail() {
    return localStorage.getItem('email')
  }
  changeLang(lang){
    this._local.setUserLang(lang)
  }
}
