import { Component, OnInit } from '@angular/core';
import { ProviderModel } from 'src/app/models/provider.model';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  public providerList: ProviderModel[];
  public categoryList: Category[];
  public success = false;

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  get nameControl(): FormControl{
    return this.addProductForm.controls.name as FormControl;
  }

  get quantityControl(): FormControl{
    return this.addProductForm.controls.quantity as FormControl;
  }

  get priceControl(): FormControl{
    return this.addProductForm.controls.price as FormControl;
  }


    public addProductForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      weight: [''],
      price: ['', Validators.required],
      date: [''],
      provider: [''],
      category: [''],
      image: [''],
      description: ['']
    })

  ngOnInit() {
    console.log(this.addProductForm.controls.price);
    this.providerService.refreshProviderList();
    this.categoryService.refreshCategoryList();
  }

  addProduct() {

    let product: Product = {
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      weight: this.addProductForm.value.weight,
      quantity: this.addProductForm.value.quantity,
      status: (this.addProductForm.value.quantity > 0) ? 1 : 0,
      manufactureDate: this.addProductForm.value.date,
      providerId: this.addProductForm.value.provider,
      categoryId: this.addProductForm.value.category
    };

    // this.productService.createProduct(product)
    // .subscribe(
    //   data => {
    //     this.success = true;
    //     this.productService.refreshProductList();
    //     this.dialogRef.close();
    //     console.log('product added: ', product);    
    //   },
    //   error => this.success = false
    //   )

  }

  validProviderCategoryAndWeight() {
    return this.addProductForm.value.provider && this.addProductForm.value.category
      && this.addProductForm.value.weight;
  }

  numberOnly(event){
    let regex: RegExp = /^\d*\.?\d*$/;
    if(!regex.test(event.target.value)){
      event.preventDefault();
    }
    else{
      
    }
  }
}
