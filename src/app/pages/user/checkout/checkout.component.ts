import { ToastService } from 'src/app/services/toast/toast.service';
import { CartService } from './../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  loading = false;
  constructor(public cart: CartService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
  }
  onConfirmCheckOut() {
    this.loading = true;
    this.cart.checkOut().subscribe(res => {
      this.loading = false;
      this.toast.showToast('Your order submitted successfully', 'success')
      this.cart.clearCart()
      this.router.navigateByUrl('/user/courses')
      console.log(res);

    }, err => {
      this.loading = false;
      this.toast.showToast('Error while submitting your order, please try again', 'error')
      console.log(err);

    })
  }
}
