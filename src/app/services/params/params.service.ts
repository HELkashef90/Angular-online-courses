import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  userLang: string = null;
  constructor() { }

  getParams() {

    let queryParams = {};
    //create an anchor tag to use the property called search
    let anchor = document.createElement('a');
    //assigning url to href of anchor tag
    anchor.href = location.href;
    //search property returns the query string of url
    let queryStrings = anchor.search.substring(1);
    let params = queryStrings.split('&');

    for (var i = 0; i < params.length; i++) {
      var pair = params[i].split('=');
      queryParams[pair[0]] = decodeURIComponent(pair[1]);
    }
    this.userLang = queryParams["lang"];
    console.log(`user lang from param`, this.userLang);

  }


}
