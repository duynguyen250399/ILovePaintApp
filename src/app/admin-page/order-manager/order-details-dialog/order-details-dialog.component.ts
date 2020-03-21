import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from "../../../../config/data";
import { Order } from 'src/app/models/order.model';
import { ShipperService } from 'src/app/services/shipper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';

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

  public productVolume: any;

  ngOnInit() {
    console.log(this.data);
    this.shipperForm = this.fb.group({
      shipper: [this.data.shipperID ? this.data.shipperID : '', [Validators.required]]
    })
    
    this.statusForm = this.fb.group({
      status: [this.data.status]
    });

    this.url = DataConfig.baseUrl;

    this.orderService.getOrderById(this.data.id)
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

    if(newOrder.status == 1){
      let orderMail = {
        order: {
          id: this.data.id,
          fullName: this.data.fullName,
          phoneNumber: this.data.phoneNumber,
          address: this.data.address,
          email: this.data.email
        },
        orderItems: []
      }
      this.data.orderItems.forEach(item =>{
        let itemMail = {
          productName: item.product.name,
          quantity: item.quantity,
          amount: item.amount,
          unitPrice: item.unitPrice,
          volumeValue: item.volumeValue
        };

        orderMail.orderItems.push(itemMail);
      });
      
      this.emailService.sendOrderConfirmEmail(orderMail);
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
