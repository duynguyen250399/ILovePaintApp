import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from "../../../../config/data";
import { Order } from 'src/app/models/order.model';
import { ShipperService } from 'src/app/services/shipper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private orderService: OrderService,
  private shipperService: ShipperService,
  private fb: FormBuilder) { }

  public orderData: Order;
  public url: string;
  public total: number = 0;
  public shipperForm: FormGroup;
  ngOnInit() {
    this.shipperForm = this.fb.group({
      shipper: ['', [Validators.required]]
    })

    this.url = DataConfig.baseUrl;

    this.orderService.getOrderById(this.data)
    .subscribe(
      data =>{   
        this.orderData = data as Order;
        this.orderData.orderItems.forEach(item => {
          this.total = this.total + item.amount;
        });
      }
    )


    if(!this.shipperService.shipperList || this.shipperService.shipperList.length == 0){
      this.shipperService.loadShipperList();
    }
  }

  log(obj){
    console.log(obj);
  }

}
