import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { OrderData } from 'src/app/models/order-data.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: OrderService,
    private fb: FormBuilder) { }

  public checkoutForm: FormGroup;

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.noSpecialCharsWithVietnameseRegex)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.phoneNumberRegex)
      ]],
      address: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      notes: [''],
      gender: ['', [
        Validators.required
      ]]
    })
  }

  get fullNameControl(){
    return this.checkoutForm.get('fullName');
  }

  get phoneControl(){
    return this.checkoutForm.get('phone');
  }

  get addressControl(){
    return this.checkoutForm.get('address');
  }

  get emailControl(){
    return this.checkoutForm.get('email');
  }

  get genderControl(){
    return this.checkoutForm.get('gender');
  }

  async checkout(){
    let order: Order = {
      fullName: this.fullNameControl.value,
      phoneNumber: this.phoneControl.value,
      address: this.addressControl.value,
      email: this.emailControl.value,
      gender: (this.genderControl.value == 0) ? false : true,
      notes: this.checkoutForm.get('notes').value
    }

    let orderItems: OrderItem[] = [];
    for(let i = 0; i < this.orderService.orderItemList.length; i++){
      let item = this.orderService.orderItemList[i];
      let orderItem: OrderItem = {
        productId: item.productId,
        amount: item.amount,
        quantity: item.quantity
      }
      orderItems.push(orderItem);
    }

    let orderData: OrderData = {
      order: order,
      orderItems: orderItems
    }

    this.orderService.checkoutOrder(orderData);
   
  }

}
