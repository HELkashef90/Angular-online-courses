import { CartService } from './../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { NgxConfirmBoxService } from 'ngx-confirm-box';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentAction: Object;

  constructor(public cart: CartService,
    private confirmBox: NgxConfirmBoxService) { }

  ngOnInit(): void {
  }
  onCheckOutClick() {

  }
  confirmChange($event) {
    console.log($event);
    $event ? this.confirmAction() : null;

  }
  confirmAction() {
    switch (this.currentAction['method']) {

      case 'removeChapter':
        this.cart.removeFromCart(this.currentAction['parameter'])
        this.currentAction = {}
        break;
      case 'removeAll':
        this.cart.clearCart()
        this.currentAction = {}
      default:
        break;
    }
  }
  removeChapter(chapter) {
    this.confirmBox.show();
    this.currentAction = {
      method: "removeChapter",
      parameter: chapter
    }
  }

  removeAll() {
    this.confirmBox.show();
    this.currentAction = {
      method: "removeAll",
      parameter: ''
    }
  }

}
