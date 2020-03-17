import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {

  constructor(private orderService: OrderService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  public filterForm: FormGroup;

  ngOnInit() {
    this.filterForm = this.fb.group({
      status: ['-1']
    });
    

    if (!this.orderService.orderList || this.orderService.orderList.length === 0) {
      this.orderService.loadOrderList();
    }
  }

  openOrderDetailsDialog(orderId: number) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '600px';
    dialogConfig.data = orderId;
    this.dialog.open(OrderDetailsDialogComponent, dialogConfig);
  }

  onStatusSelected(event) {
    if (event.target.checked) {
      this.filterOrders(event.target.value);
    }
    // this.orderService.orderList.forEach(o => console.log(o.status))
  }

  filterOrders(status) {

    if (status == -1) {
      this.orderService.loadOrderList();
    }
    else {
      this.orderService.getOrderList()
        .subscribe(
          data => {
            this.orderService.orderList = data as Order[];
            this.orderService.orderList = this.orderService.orderList
              .filter(o => o.status == status);
          }
        )

    }

  }

}
