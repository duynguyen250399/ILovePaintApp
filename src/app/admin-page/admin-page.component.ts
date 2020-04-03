import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private orderService: OrderService,
    private userService: UserService) { }

  public listItemState = -1;

  ngOnInit() {
    if(!this.orderService.orderList || this.orderService.orderList.length === 0){
      this.orderService.loadOrderList();
    }
  }

  changeListItemState(state: number){
    this.listItemState = state;
  }


}
