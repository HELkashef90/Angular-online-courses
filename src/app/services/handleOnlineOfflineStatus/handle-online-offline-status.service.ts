import { Injectable } from '@angular/core';
declare var $: any
@Injectable({
  providedIn: 'root'
})
export class HandleOnlineOfflineStatusService {
  isOnline: boolean = true;

  constructor() {
    // console.log("HandleOnlineOfflineStatusService");

  }

  init() {
    window.addEventListener('online', (ev) => {
      document.getElementById('connectionErrorMsg').style.display = 'none'
      this.isOnline = true;
    });
    window.addEventListener('offline', (ev) => {
      document.getElementById('connectionErrorMsg').style.display = 'block'
      this.isOnline = false;
    });

    // document.body.addEventListener('click', (e) => {
    //   // console.log("ajaxClick", e.target.classList.contains("ajaxReqClick") && !navigator.onLine);
    //   if (e.target.classList.contains("ajaxReqClick") && !navigator.onLine) {
    //     let connectionErrorMsg = document.getElementById('connectionErrorMsg')
    //     connectionErrorMsg.style.display = 'block'
    //     connectionErrorMsg.classList.add.apply(connectionErrorMsg.classList, ["animated", "shake", "fast"])
    //     setTimeout(() => {
    //       connectionErrorMsg.classList.remove.apply(connectionErrorMsg.classList, ["animated", "shake", "fast"])
    //     }, 200);
    //   }
    // })
  }

}