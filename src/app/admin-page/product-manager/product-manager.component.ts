import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { nonAccentVietnamese } from "../../../helpers/helper";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {

  public productList: Product[];

  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.refreshProductList();
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(
        data => {
          console.log('product deleted: ', data);
          this.productService.productList = this.productService.productList
            .filter(product => product.id !== id);
        },
        error => console.log(error)
      )
  }

  openAddProductDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);
  }

  filterProducts(value: string){
    if(!this.productService.productList){
      return;
    }

    let filterResult = [];
    let filterValue = value.toLowerCase().trim();
    
    this.productService.productList.forEach(product => {
      let name: string = nonAccentVietnamese(product.name);
      let provider = (product.provider) ? product.provider.name : "Unknown";
      let category = (product.category) ? product.category.name : "Unknown";

      let providerNonVietnamese: string = nonAccentVietnamese(provider);
      let categoryNonVietnamese: string = nonAccentVietnamese(category);
      
      if(name.includes(filterValue) || providerNonVietnamese.includes(filterValue) || categoryNonVietnamese.includes(filterValue)){
        filterResult.push(product);
      }
    });
    
    if(value){
      this.productService.productList = filterResult;
    }
    else{
      this.productService.refreshProductList();
    }
    
  }


}
