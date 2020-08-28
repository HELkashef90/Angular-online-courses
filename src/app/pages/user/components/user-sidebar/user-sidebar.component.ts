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
    public cart: CartService,
    public _local: LocalizationService) { }
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

  changeLang(lang) {
    this._local.setUserLang(lang);
  }



  ngAfterViewInit() {

    //sidebar
    // var sidebarBtn = document.getElementById('collapse_menu');

    // sidebarBtn.onclick = function menuAnimation() {
    //   //alert('working')
    //   var verticalSideBar = document.querySelector(".vertical_nav");
    //   verticalSideBar.classList.toggle("vertical_nav__minify");
    //   var wrapper = document.querySelector(".wrapper");
    //   wrapper.classList.toggle("wrapper__minify");
    //   // var sidekickToggle = document.querySelector(".chapterListToggle");
    //   // sidekickToggle.classList.toggle("minify");
    // }
  }
  collapse() {
    var verticalSideBar = document.querySelector(".vertical_nav");
    verticalSideBar.classList.toggle("vertical_nav__minify");
    var wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("wrapper__minify");
    var footer = document.querySelector(".footer");
    footer.classList.toggle("wrapper__minify");
  }


close(){
    var verticalSideBar = document.querySelector(".vertical_nav");
    verticalSideBar.classList.toggle("vertical_nav__minify");
    var wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("wrapper__minify");
  }
// }
  // openMenu(){
    // this.displayBlock=true;
    // this.displayLogOtDiv=false;

  // }
  // openLogoutDiv(){
    // this.displayLogOtDiv=true;
    // this.displayBlock=false;

  // }

}
