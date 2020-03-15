import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product.model';
import { OrderItemCart } from 'src/app/models/order-item-cart';
import { OrderService } from 'src/app/services/order.service';
import { DataConfig } from 'src/config/data';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute) { }
  public product: Product;
  public productImage: string;
  public quantity: number = 1;

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId)
      .subscribe(data => {
        this.product = data as Product;
        this.productImage = 'https://localhost:44385/api/images/product/' + this.product.id;
      });
  }

  addToCart() {
    let orderItem: OrderItemCart = {
      productId: this.product.id,
      quantity: this.quantity,
      productName: this.product.name,
      productPrice: this.product.price,
      amount: this.quantity * this.product.price,
      image: DataConfig.baseUrl + '/images/product/' + this.product.id
    }
    // console.log(orderItem)

    this.orderService.addOrderItemToCart(orderItem);
  }

}
