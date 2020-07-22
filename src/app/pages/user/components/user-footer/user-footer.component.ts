import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  constructor(public _localizationService : LocalizationService) { }

  ngOnInit(): void {
  }

  changeLanguage(event){
    this._localizationService.setUserLang(event.target.value)
  }
}
