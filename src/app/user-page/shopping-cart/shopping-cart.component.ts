import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemCart } from 'src/app/models/order-item-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  public total: number = 0;

  ngOnInit() {
    this.orderService.refreshOrderItemList();
  }

  removeItem(key){
    sessionStorage.removeItem(key);
    this.orderService.refreshOrderItemList();
  }

  increaseQuantity(key){
    let orderItem: OrderItemCart = JSON.parse(sessionStorage.getItem(key));
    orderItem.quantity = parseInt(orderItem.quantity.toString()) + 1;
    orderItem.amount = orderItem.quantity * orderItem.productPrice;
    sessionStorage.setItem(key, JSON.stringify(orderItem));
    this.orderService.refreshOrderItemList();
  }

  decreaseQuantity(key){
    let orderItem: OrderItemCart = JSON.parse(sessionStorage.getItem(key));
    if(orderItem.quantity == 1){
      return;
    }

    orderItem.quantity = parseInt(orderItem.quantity.toString()) - 1
    orderItem.amount = orderItem.quantity * orderItem.productPrice;
    sessionStorage.setItem(key, JSON.stringify(orderItem));
    this.orderService.refreshOrderItemList();
  }

}