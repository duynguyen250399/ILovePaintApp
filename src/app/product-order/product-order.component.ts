import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  public product: any;
  private defaultImage = '/assets/images/default_product.png';

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId)
    .subscribe(data => {
      this.product = data;
      if(this.product.image == null){
        this.product.image = this.defaultImage;
      }
    });
  }

}
