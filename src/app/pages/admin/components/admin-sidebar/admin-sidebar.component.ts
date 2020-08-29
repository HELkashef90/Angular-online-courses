import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private _auth: AuthService,
    public _local : LocalizationService) { }

  ngOnInit(): void {
  }
  signOut() {
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
  collapse(){
    var verticalSideBar = document.querySelector(".vertical_nav");
    verticalSideBar.classList.toggle("vertical_nav__minify");
    var wrapper = document.querySelector(".wrapper");
    wrapper.classList.toggle("wrapper__minify");
  }
  close(){
    var verticalSideBar = document.querySelector(".vertical_nav");
    var wrapper = document.querySelector(".wrapper");
    if (window.matchMedia("(max-width: 992px)").matches) {
      verticalSideBar.classList.toggle("vertical_nav__minify");
      wrapper.classList.toggle("wrapper__minify");
  }
  }
}
