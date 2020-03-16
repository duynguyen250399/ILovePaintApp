import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  public listItemState = -1;

  ngOnInit() {
    this.orderService.loadOrderList();
  }

  changeListItemState(state: number){
    this.listItemState = state;
  }


}
