import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    if(!this.orderService.orderList || this.orderService.orderList.length === 0){
      this.orderService.loadOrderList();
    }
  }

}
