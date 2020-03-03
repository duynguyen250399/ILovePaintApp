import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {

  public productList: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductList()
    .subscribe(data => this.productList = data as Product[]);
  }

  deleteProduct(id){
    this.productService.deleteProduct(id)
    .subscribe(
      data => {
        console.log('product deleted: ', data);
        this.productList = this.productList.filter(product => product.id !== id);
      },
      error => console.log(error)
      )
  }

}
