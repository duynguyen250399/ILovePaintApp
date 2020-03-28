import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile.model';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.css']
})
export class UserCheckoutComponent implements OnInit {

  constructor(private orderService: OrderService,
    private userService: UserService,
    private router: Router) { }

    public loading = false;
    public userProfile: UserProfile;
    public notes: string = '';

  ngOnInit() {
    if(!this.orderService.orderItemList || this.orderService.orderItemList.length == 0){
      this.router.navigate(['/']);
    }

    let token = localStorage.getItem('jwt');
    if(!token){
      this.router.navigate(['my-cart']);
    }

    this.userService.getUserProfile()
    .subscribe(
      res => {
        this.userProfile = res as UserProfile;
      },
      err =>{
        console.log(err);       
      }
    )
  }

    checkout(){
      this.loading = true;
      this.orderService.orderItemList.forEach(item => {
        item.product.productVolumes[0].price = parseInt(item.product.productVolumes[0].price.replace(',',''))
      });
  
      let order: Order = {
        fullName: this.userProfile.fullName,
        phoneNumber: this.userProfile.phoneNumber,
        address: this.userProfile.address,
        email: this.userProfile.email,
        gender: this.userProfile.gender,
        notes: this.notes,
        status: 0,
        isMember: true,
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
