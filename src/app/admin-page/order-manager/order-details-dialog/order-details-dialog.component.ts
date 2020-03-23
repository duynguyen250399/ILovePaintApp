import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from "../../../../config/data";
import { Order } from 'src/app/models/order.model';
import { ShipperService } from 'src/app/services/shipper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { formatNumber } from 'src/helpers/helper';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private orderService: OrderService,
  private shipperService: ShipperService,
  private emailService: EmailService,
  private fb: FormBuilder,
  private router: Router) { }

  public orderData: Order;
  public url: string;
  public total: number = 0;
  public shipperForm: FormGroup;
  public statusForm: FormGroup;
  public loading = false;
  
  public unitPriceFormat: string;
  public totalFormat: string;

  public productVolume: any;

  ngOnInit() {
  
    this.shipperForm = this.fb.group({
      shipper: [this.data.shipperID ? this.data.shipperID : '', [Validators.required]]
    })
    
    this.statusForm = this.fb.group({
      status: [this.data.status]
    });
  
    this.data.orderItems.forEach(item =>{
      this.total = this.total + item.amount;
      item.unitPrice = formatNumber(item.unitPrice);
    });
    this.totalFormat = formatNumber(this.total);

    this.url = DataConfig.baseUrl;

    if(!this.shipperService.shipperList || this.shipperService.shipperList.length == 0){
      this.shipperService.loadShipperList();
    }


  }

  onShipperChange(){
    if(this.shipperForm.value.shipper !== ''){
      this.statusForm.setValue({status: 2})
    }
    else{
      this.statusForm.setValue({status: 0})
    }    
  }

  saveOrder(){
    if((this.statusForm.value.status == 2 || this.statusForm.value.status == 3) && !this.shipperForm.value.shipper){
      return;
    }
    this.loading = true;

    let newOrder = {
      orderId: this.data.id,
      status: this.statusForm.value.status,
      shipperId: this.shipperForm.value.shipper
    }   

    this.orderService.updateOrder(newOrder)
    .subscribe(
      data => {      
        console.log('order updated: ', data);
        this.loading = false;
        location.reload();
        
      },
      error => console.log(error)
    )
  }

}
