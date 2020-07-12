import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadScriptsService {

  constructor() { }

  scripts = {

    'owl.carousel.min.js': 'assets/js/owl.carousel.min.js',
    'slick.min.js': 'assets/js/slick.min.js',
    'plugin_accordion.js': 'assets/js/plugin_accordion.js',
    'main.js': 'assets/js/main.js',
    'velocity.js' : 'assets/js/wheel/js/velocity.js',
    'index.js' : 'assets/js/wheel/js/index.js',
    'home.tab.js' : 'assets/js/home.tab.js',
    'splash-animation.js':'assets/ng-js/splash-animation.js'
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
    } else {
      this.removeScript(name);
      this.loadScript(name);
    }
  }

  removeScript(name) {
    document.body.removeChild(this.loadedScripts[name])
  }


}
