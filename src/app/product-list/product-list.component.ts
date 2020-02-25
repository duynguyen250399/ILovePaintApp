import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  public productList = [];

  ngOnInit() {
    let chunkSize = 3;
    this.productService.getProductList()
    .subscribe(data => {
      // process product display data
        let chunks = data as [];
        for(let i = 0; i < chunks.length; i += chunkSize){
          if(i + chunkSize < chunks.length){
            this.productList.push(chunks.slice(i, i + chunkSize));
          }
        }
        let remainingElementIndex = chunks.length - (chunks.length % chunkSize);
       
        this.productList.push(chunks.slice(remainingElementIndex, chunks.length))
        console.log(this.productList);
    });
  }

}
