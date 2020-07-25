import { LocalizationService } from './../../../../services/localization/localization.service';
import { LazyLoadScriptsService } from './../../../../services/lazyLoadScripts/lazy-load-scripts.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _lazyLoadScript: LazyLoadScriptsService, public _auth: AuthService,
    public _local : LocalizationService) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit(){
  //   this._lazyLoadScript.loadAllScripts()
  // }
  ngOnDestroy() { }
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
