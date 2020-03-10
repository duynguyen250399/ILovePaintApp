import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { nonAccentVietnamese } from "../../../helpers/helper";
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.refreshProductList();
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)

  }

  openAddProductDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);
  }

  openEditProductDialog(product) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '600px';
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(EditProductDialogComponent, dialogConfig);
  }

  filterProducts(value: string) {
    if (!this.productService.productList) {
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

      if (name.includes(filterValue) || providerNonVietnamese.includes(filterValue) || categoryNonVietnamese.includes(filterValue)) {
        filterResult.push(product);
      }
    });

    if (value) {
      this.productService.productList = filterResult;
    }
    else {
      this.productService.refreshProductList();
    }

  }


  nextChunk() {
    if (!this.productService.productList || this.productService.productList.length == 0) {
      return;
    }
    this.productService.stopPrev = false;

    this.productService.currentChunkIndex = this.productService.currentChunkIndex + 1;

    if (this.productService.currentChunkIndex >= this.productService.pageItems.length - 1) {
      this.productService.stopNext = true;
    }
  }

  prevChunk() {

    if (!this.productService.productList || this.productService.productList.length == 0) {
      return;
    }

    this.productService.stopNext = false;

    this.productService.currentChunkIndex = this.productService.currentChunkIndex - 1;

    if (this.productService.currentChunkIndex <= 0) {
      this.productService.stopPrev = true;
    }
  }


}
