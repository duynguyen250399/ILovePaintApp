import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderData } from 'src/app/models/order-data.model';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from "../../../../config/data";

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private orderService: OrderService) { }

  public orderData: OrderData;
  public url: string;
  public total: number = 0;
  ngOnInit() {
    this.url = DataConfig.baseUrl;
    this.orderService.getOrderById(this.data)
    .subscribe(
      data =>{   
        this.orderData = data as OrderData;
        this.orderData.orderItems.forEach(item => {
          this.total = this.total + item.amount;
        });
      }
    )
  }

}
