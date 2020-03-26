import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProviderService } from 'src/app/services/provider.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private fb: FormBuilder) { }

  public productList = [];
  public filterForm: FormGroup;

  ngOnInit() {

    this.filterForm = this.fb.group({
      category: [''],
      provider: ['']
    });

    this.productService.getProductList()
      .subscribe(data => {
        this.processProductList(data);
      },
        err => console.log(err));

    this.categoryService.refreshCategoryList();
    this.providerService.refreshProviderList();
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

  filterProducts() {
    let categoryId = this.filterForm.value.category;
    let providerId = this.filterForm.value.provider;

    this.productService.getProductList()
      .subscribe(
        data => {
          this.productService.productList = data as Product[];
          if (!categoryId && providerId) {
            this.productService.productList = this.productService.productList
              .filter(p => p.providerID == providerId);
            this.processProductList(this.productService.productList);
          }

          if (categoryId && !providerId) {
            this.productService.productList = this.productService.productList
              .filter(p => p.categoryID == categoryId);    
            this.processProductList(this.productService.productList);
          }

          if(providerId && categoryId){
            this.productService.productList = this.productService.productList
              .filter(p => p.categoryID == categoryId && p.providerID == providerId);    
            this.processProductList(this.productService.productList);
          }

          if (!providerId && !categoryId) {
            this.processProductList(data);
          }
          console.log(this.productList)
          console.log(this.productList.length)
        },
        err => console.log(err)
      )



    // console.log(this.productList)
  }

}
