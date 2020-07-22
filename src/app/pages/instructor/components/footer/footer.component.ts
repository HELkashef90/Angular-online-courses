import { LocalizationService } from './../../../../services/localization/localization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public _localizationService : LocalizationService) { }

  ngOnInit(): void {
  }

  changeLanguage(event){
    this._localizationService.setUserLang(event.target.value)
  }
}
