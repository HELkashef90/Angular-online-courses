import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  //disabled console.log
  console.log = () => { }
  console.error = () => { }
}
document.addEventListener('contextmenu', event => event.preventDefault());
//disabled console.log
// console.log = () => { }
// console.error = () => { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
