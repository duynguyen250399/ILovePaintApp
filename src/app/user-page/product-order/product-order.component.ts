import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product.model';
import { OrderItemCart } from 'src/app/models/order-item-cart';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from 'src/config/data';
import { ProductVolumeService } from 'src/app/services/product-volume.service';
import { ProductVolume } from 'src/app/models/product-volume.model';
import { formatNumber } from 'src/helpers/helper';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }
  public product: Product;
  public productImage: string;
  public quantity: number = 1;
  public formatedPrice: number;

  public currentProductVolume: ProductVolume;

  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId)
      .subscribe(data => {
        this.product = data as Product;
        this.currentProductVolume = this.product.productVolumes[0];
        this.formatedPrice = formatNumber(this.currentProductVolume.price);   
        
      });
  }

  addToCart() {
    let orderItem: OrderItemCart = {
      productId: this.product.id,
      quantity: this.quantity,
      productName: this.product.name,
      productPrice: this.currentProductVolume.price,
      amount: this.quantity * this.currentProductVolume.price,
      image: DataConfig.baseUrl + '/images/product/' + this.product.id
    }

    this.orderService.addOrderItemToCart(orderItem);
  }

  increaseQuantity(){
    this.quantity = this.quantity + 1;
  }

  decreaseQuantity(){
    if(this.quantity === 1){
      return;
    }

    this.quantity = this.quantity - 1;
  }

  onVolumeChange(e){
    let selectedIndex = this.product.productVolumes.findIndex(pv => pv.volumeID == e.target.value);
    
    if(selectedIndex >= 0){
      this.currentProductVolume = this.product.productVolumes[selectedIndex];
      this.formatedPrice = formatNumber(this.currentProductVolume.price);
    }
  
  }

}
