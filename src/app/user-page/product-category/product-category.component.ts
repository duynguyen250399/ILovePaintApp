import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  public productList = [];

  ngOnInit() {
    let categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductList()
    .subscribe(
      res => {
        this.productList = res as Product[];
        this.productList = this.productList.filter(p => p.categoryID == categoryId);
        this.processProductList(this.productList);
      },
      err =>{
        console.log(err);
      }
    )
  }

  processProductList(data) {
    let chunkSize = 4;
    // process product display data
    this.productList = [];
    let chunks: Product[] = data as Product[];
    for (let i = 0; i < chunks.length; i += chunkSize) {
      if (i + chunkSize <= chunks.length) {
        this.productList.push(chunks.slice(i, i + chunkSize));
      }
    }
    
    let remainingElementIndex = chunks.length - (chunks.length % chunkSize);
    if(chunks.slice(remainingElementIndex, chunks.length).length > 0){
      this.productList.push(chunks.slice(remainingElementIndex, chunks.length))
    }
    
  }

}
