import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PWAControllerService {
  deferredPrompt: any = null;

  constructor() { }

  preventAddToHomeScreen() {
    //to prevent add to home screen suggestion by browser //
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 76 and later from showing the mini-infobar
      e.preventDefault();
      // Stash the event so it can be triggered later.
      return this.deferredPrompt = e;

    });
  }

  displayInstallPrompt(){
    this.deferredPrompt ? this.deferredPrompt.prompt() : null
  }

}
