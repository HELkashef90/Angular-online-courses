import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadScriptsService {

  constructor() { }

  scripts = {

    'assets/vertical-responsive-menu.min.js': "assets/js/vertical-responsive-menu.min.js",
    "assets/js/popper.min.js":"assets/js/popper.min.js",
    "assets/js/jquery.cookie.js":"assets/js/jquery.cookie.js",
    'assets/js/swiper.min.js': "assets/js/swiper.min.js",
    "assets/js/semantic.min.js": "assets/js/semantic.min.js",
    "assets/js/front.js": "assets/js/front.js",
    "assets/js/custom.js": "assets/js/custom.js",
    "assets/js/custom1.js": "assets/js/custom1.js",
    "assets/js/night-mode.js": "assets/js/night-mode.js",
    "assets/js/datepicker.min.js": "assets/js/datepicker.min.js",
    "assets/js/i18n/datepicker.en.js": "assets/js/i18n/datepicker.en.js",
    "assets/js/jquery-steps.min.js": "assets/js/jquery-steps.min.js",
    "assets/js/bootstrap.min.js":"assets/js/bootstrap.min.js",
    "assets/js/owl.carousel.js":"assets/js/owl.carousel.js"
  }
  loadedScripts = {};

  async loadScript(name: string) {
    if (!this.loadedScripts[name]) {
      let body = document.getElementsByTagName("body")[0];
      let newScript = document.createElement('script')
      newScript.src = this.scripts[name];
      newScript.async = true;
      newScript.defer = true;
      await body.appendChild(newScript)
      this.loadedScripts[name] = newScript
      // console.log(newScript);

    } else {
      this.removeScript(name);
      this.loadScript(name);
    }
  }

  removeScript(name) {
    document.body.removeChild(this.loadedScripts[name]);
    delete this.loadedScripts[name]
  }

  loadAllScripts() {
    for (let script in this.scripts) {
      this.loadScript(script)
    }
  }
}
