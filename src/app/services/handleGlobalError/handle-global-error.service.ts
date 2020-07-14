import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HandleGlobalErrorService {

  constructor(private _toastService: ToastService,) { }

  handleUnexpectedError(){
    this._toastService.showToast("Unexpected error occurred, please try again", 'error')
    
  }
  
}
