import { ToastService } from './../../../../services/toast/toast.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = []
  constructor(private _toast:ToastService) { }

  addToCart(chapter) {
    this.cart.push(chapter)
    this._toast.showToast("added ti cart",'success')
  }
  removeFromCart(chapter) {
    if (confirm('Are you sure?')) {
      this.cart.splice(this.cart.indexOf(chapter), 1)
    }
  }
  clearCart() {
    if (confirm('Are you sure?')) {
      this.cart = []
    }
  }

  getCartTotalPrice(){
    
  }
}
