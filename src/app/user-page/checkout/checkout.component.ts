import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';

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

}
