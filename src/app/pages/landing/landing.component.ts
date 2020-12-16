import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalizationService } from './../../services/localization/localization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  version: string;

  constructor(private _localizationService: LocalizationService, public _auth: AuthService) {
    if (localStorage.getItem("authenticationToken")) {
      this._auth.authUser()
    }

  }

  ngOnInit(): void {
    this.version = environment.appVersion
  }
  goToDashboard() {
    this._auth.redirectUserToDashboard()
  }

  changeLang(lang){
    this._localizationService.setUserLang(lang);
  }
}
