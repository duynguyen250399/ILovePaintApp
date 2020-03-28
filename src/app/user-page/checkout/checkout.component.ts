import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { EmailService } from 'src/app/services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder) { }

  public checkoutForm: FormGroup;

  public loading = false;

  ngOnInit() {
    if(!this.orderService.orderItemList || this.orderService.orderItemList.length == 0){
      this.router.navigate(['/']);
    }

    let token = localStorage.getItem('jwt');
    if(token){
      this.router.navigate(['my-cart']);
    }

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

  checkout(){
    this.loading = true;
    this.orderService.orderItemList.forEach(item => {
      item.product.productVolumes[0].price = parseInt(item.product.productVolumes[0].price.replace(',',''))
    });

    let order: Order = {
      fullName: this.fullNameControl.value,
      phoneNumber: this.phoneControl.value,
      address: this.addressControl.value,
      email: this.emailControl.value,
      gender: (this.genderControl.value == 0) ? false : true,
      notes: this.checkoutForm.get('notes').value,
      status: 0,
      isMember: false,
      orderDate: new Date()
    }

    let orderItems = [];

    this.orderService.orderItemList.forEach(item => {
      let itemFromCart = {
        productId: item.productId,
        quantity: item.quantity,
        amount: item.amount,
        productName: item.product.name,
        unitPrice: item.product.productVolumes[0].price,
        volumeValue: item.product.productVolumes[0].volumeValue,
        colorName: item.colorName,
        colorCode: item.colorCode     
      }
      orderItems.push(itemFromCart);
    });

    let orderData = {
      order: order,
      orderItems: orderItems
    }
    
    this.orderService.checkoutOrder(orderData)
    .subscribe(
      data => {
        console.log('order checkout:', data);      
        sessionStorage.clear();
        this.orderService.refreshOrderItemList();
        this.loading = false;
        this.router.navigate(['order-success']);
      },
      error => console.log(error)
    )

  }

}
