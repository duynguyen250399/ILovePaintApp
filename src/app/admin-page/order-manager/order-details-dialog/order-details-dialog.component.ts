import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from "../../../../config/data";
import { Order } from 'src/app/models/order.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatNumber } from 'src/helpers/helper';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
  private orderService: OrderService,
  private dialogService: DialogService,
  private snackBarService: SnackBarService,
  private fb: FormBuilder,
  private router: Router) { }

  public orderData: Order;
  public url: string;
  public total: number = 0;
  public statusForm: FormGroup;
  public loading = false;
  
  public unitPriceFormat: string;
  public totalFormat: string;

  public productVolume: any;

  ngOnInit() {
    console.log(this.data)
    
    this.statusForm = this.fb.group({
      status: [this.data.status]
    });
  
    this.data.orderItems.forEach(item =>{
      this.total = this.total + item.amount;
      item.unitPrice = formatNumber(item.unitPrice);
    });
    this.totalFormat = formatNumber(this.total);

    this.url = DataConfig.baseUrl;


  }

  saveOrder(){
   
    this.loading = true;

    let newOrder = {
      orderId: this.data.id,
      status: this.statusForm.value.status 
    }   

    this.orderService.updateOrder(newOrder)
    .subscribe(
      data => {      
        console.log('order updated: ', data);    
        this.orderService.loadOrderList();
        this.loading = false;
        this.snackBarService.showSnackBar('Order status changed', 'CLOSE');         
      },
      error => {
        console.log(error);
        this.snackBarService.showSnackBar('Error!', 'CLOSE');
      }
    )
  }

  cancelOrder(){
    this.dialogService.openConfirmDialog('Are you sure to cancel this order?')
    .afterClosed()
    .subscribe(
      res => {
        if(res){
          this.orderService.removeOrder(this.data.id)
          .subscribe(
            res =>{
              this.orderService.loadOrderList();
              this.snackBarService.showSnackBar('Order cancelled', 'CLOSE');
              this.dialogRef.close();
            },
            err =>{
              console.log(err);
              this.snackBarService.showSnackBar('Error!', 'CLOSE');
              this.loading = false;
            }
          )
        }
      }
    )
  }

}
