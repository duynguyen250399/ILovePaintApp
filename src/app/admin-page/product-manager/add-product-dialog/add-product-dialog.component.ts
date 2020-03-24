import { Component, OnInit } from '@angular/core';
import { ProviderModel } from 'src/app/models/provider.model';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MatDialogRef } from '@angular/material';
import { ValidationPatterns } from 'src/helpers/helper';
import { ImageService } from 'src/app/services/image.service';
import * as uuid from "uuid";
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  public providerList: ProviderModel[];
  public categoryList: Category[];
  public success = false;
  public productImage: File;
  public imageUrl: string = "/assets/images/default_product.png";
  public uploadPath: string;
  public imageName: string;

  constructor(private fb: FormBuilder,
    private imageService: ImageService,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  get nameControl(): FormControl {
    return this.addProductForm.controls.name as FormControl;
  }

  get quantityControl(): FormControl {
    return this.addProductForm.controls.quantity as FormControl;
  }

  get priceControl(): FormControl {
    return this.addProductForm.controls.price as FormControl;
  }

  get weightControl(): FormControl {
    return this.addProductForm.controls.weight as FormControl;
  }

  get providerControl(): FormControl {
    return this.addProductForm.controls.provider as FormControl;
  }

  get categoryControl(): FormControl {
    return this.addProductForm.controls.category as FormControl;
  }


  public addProductForm = this.fb.group({
    name: ['',
      [
        Validators.required,
        Validators.pattern(ValidationPatterns.noSpecialCharsWithVietnameseRegex),
        Validators.minLength(5),
        Validators.maxLength(30)
      ]],
    provider: [''],
    category: [''],
    image: [''],
    description: ['']
  })

  ngOnInit() {
    this.providerService.refreshProviderList();
    this.categoryService.refreshCategoryList();
  }

  addProduct() {

    let formData = new FormData();
    formData.append('name', this.addProductForm.get('name').value);
    formData.append('description', this.addProductForm.get('description').value);
    formData.append('providerId', this.addProductForm.get('provider').value);
    formData.append('categoryId', this.addProductForm.get('category').value);
    if (this.productImage) {
      this.imageName = Date.now().toString() + '-iLovePaint-' + uuid.v4() + '-' + this.productImage.name;
      this.uploadPath = '/uploads/images/products/'+ this.imageName;
      formData.append('image', this.uploadPath);
    }

    this.productService.createProduct(formData)
      .subscribe(
        data => {
          this.productService.refreshProductList();
          console.log('product added');
          this.snackBarService.showSnackBar('Product added', 'Close');
        },
        error => console.log(error)
      )

    if (this.productImage) {
      let imageFormData = new FormData();
      imageFormData.append('file', this.productImage, this.productImage.name)
      this.imageService.uploadProductImage(imageFormData, this.imageName);
    }


  }

  validProviderCategory() {
    return this.addProductForm.value.provider && this.addProductForm.value.category;
  }

  onImageSelected(event) {
    this.productImage = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsDataURL(this.productImage);

    fileReader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

  }

}
