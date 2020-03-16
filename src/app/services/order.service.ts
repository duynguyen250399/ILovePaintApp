import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItemCart } from '../models/order-item-cart';
import { DataConfig } from 'src/config/data';
import { OrderData } from '../models/order-data.model';
import { Router } from '@angular/router';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
    private router: Router) { }

  public orderItemList: OrderItemCart[];
  public total: number = 0;
  
  public orderList: OrderData[] = [];

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

  checkoutOrder(orderData: OrderData){
    orderData.order.isMember = false;
    this.http.post(DataConfig.baseUrl + '/order', orderData)
    .subscribe(
      data => {
        console.log('order checkout:', data);
        this.router.navigateByUrl('/');
        sessionStorage.clear();
        this.refreshOrderItemList();
      },
      error => console.log(error)
    )
  }

  loadOrderList(){
    this.http.get(DataConfig.baseUrl + '/order')
    .subscribe(
      data => this.orderList = data as OrderData[],
      error => console.log(error)
    )
  }

  getOrderById(id){
    return this.http.get(DataConfig.baseUrl + '/order/' + id);
  }
}
