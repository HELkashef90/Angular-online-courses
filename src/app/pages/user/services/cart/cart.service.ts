import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './../../../../services/toast/toast.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = []
  constructor(private _toast: ToastService,
    private httpClient: HttpClient) { }


  checkOut() {
    return this.httpClient.post(environment._checkOut, this.cart)
  }

  isChapterExistInCart(chapter: any) {
    for (let i = 0; i < this.cart.length; i++) {
      if (chapter.id === this.cart[i].id) {
        return true
      }

    }
  }

  addToCart(chapter) {
    this.cart.push(chapter)
    this._toast.showToast("Added to cart", 'success')
  }
  removeFromCart(chapter) {
   
      this.cart.splice(this.cart.indexOf(chapter), 1)

  }
  clearCart() {
    this.cart = []
  }

  getCartTotalPrice() {
    let totalPrice = 0
    for (let i = 0; i < this.cart.length; i++) {
      totalPrice += this.cart[i].chapter_fee
    }
    return totalPrice
  }
  // getNumOfChaptersBySubject(lockup){
  //   return 2
  // }
}
