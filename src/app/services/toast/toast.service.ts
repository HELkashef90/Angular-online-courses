import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showToast(message: string, type = 'info') {
    switch (type) {
      case 'info':
        this.toastr.info(message)
        break;
      case 'success':
        this.toastr.success(message)
        break;
      case 'warning':
        this.toastr.warning(message)
        break;
      case 'error':
        this.toastr.error(message)
        break;
      default:
        break;
    }
  }
}
