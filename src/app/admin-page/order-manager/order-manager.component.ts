import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderData } from 'src/app/models/order-data.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {

  constructor(private orderService: OrderService,
    public dialog: MatDialog) { }

  ngOnInit() {
    if(!this.orderService.orderList || this.orderService.orderList.length === 0){
      this.orderService.loadOrderList();
    }
  }

  openOrderDetailsDialog(orderId: number){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '600px';
    dialogConfig.data = orderId;
    this.dialog.open(OrderDetailsDialogComponent, dialogConfig);
  }

}
