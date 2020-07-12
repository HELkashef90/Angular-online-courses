import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ParamsService } from '../params/params.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  userLang: string;
  acceptedLangs = ['ar','en']

  constructor(public translate: TranslateService, private _paramService : ParamsService) {
  }
  init(){
    this.setUserLang(this._paramService.userLang)
  }
  setUserLang(lang){

    if(!this.acceptedLangs.includes(lang)){
      console.warn("Language in param is not supported or lang param does not exist, please use 'ar' or 'en' for 'lang' param, user language automatically set to 'en");
      lang = 'en'
    }
    this.translate.use(lang)
    this.userLang = lang;
    lang === 'ar' ? document.body.classList.add('rtl') : document.body.classList.remove('rtl');
  }
}
