import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from './../components/confirm/confirm.component';
import { CartService } from './../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { NgxConfirmBoxService } from 'ngx-confirm-box';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentAction: Object;

  constructor(public cart: CartService,
    private confirmBox: NgxConfirmBoxService,
    private modalService: BsModalService,
    private translate : TranslateService) { }

  modalRef: BsModalRef;

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

    this.modalRef = this.modalService.show(ConfirmComponent, {
      initialState: {
        prompt: this.translate.instant('Are you sure you want to delete this chapter?'),
        callback: (result) => {
          if (result) {
            //pass recordId here
            this.cart.removeFromCart(chapter)
          } else {
            console.log('cancel');

          }
        }
      }
    });

    // this.confirmBox.show();
    // this.currentAction = {
    //   method: "removeChapter",
    //   parameter: chapter
    // }
  }

  removeAll() {

    this.modalRef = this.modalService.show(ConfirmComponent, {
      initialState: {
        prompt: this.translate.instant('Are you sure you want to remove all chapters?'),
        callback: (result) => {
          if (result) {
            //pass recordId here
            this.cart.clearCart()
          } else {
            console.log('cancel');

          }
        },
        animated: false
      }
    });




    //   this.confirmBox.show();
    //   this.currentAction = {
    //     method: "removeAll",
    //     parameter: ''
    //   }
  }

}
