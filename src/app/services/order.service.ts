import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItemCart } from '../models/order-item-cart';
import { DataConfig } from 'src/config/data';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public orderItemList: OrderItemCart[];
  public total: number = 0;

  refreshOrderItemList(){
    this.orderItemList = [];
    for(let i = 0; i < sessionStorage.length; i++){
      let key = sessionStorage.key(i);
      this.orderItemList.push(JSON.parse(sessionStorage.getItem(key)));
    }

    this.total = 0;

    for(let i = 0; i < this.orderItemList.length; i++){
      this.total = this.total + this.orderItemList[i].amount;
    }
  }

  addOrderItemToCart(orderItem: OrderItemCart){
    sessionStorage.setItem('order-item-' + orderItem.productId, JSON.stringify(orderItem));
    this.refreshOrderItemList();
  }
}
