import { Component, OnInit, Inject } from '@angular/core';
import { ProviderModel } from 'src/app/models/provider.model';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  public providerList: ProviderModel[];
  public categoryList: Category[];
  public product: Product;

  public productImage: File;
  public imageUrl: string;

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public editProductForm: FormGroup

  ngOnInit() {
    this.editProductForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      quantity: [this.data.quantity, Validators.required],
      weight: [this.data.weight],
      price: [this.data.price, Validators.required],
      manufactureDate: [this.data.manufactureDate],
      providerId: [(this.data.provider) ? this.data.provider.id : null],
      categoryId: [(this.data.category) ? this.data.category.id : null],
      image: [this.data.image],
      description: [this.data.description]
    })

    this.providerService.refreshProviderList();
    this.categoryService.refreshCategoryList();
    
    this.imageUrl = `https://localhost:44385/api/images/product/${this.data.id}`;
  }

  updateProduct(){
    let updatedProduct : Product = this.editProductForm.value as Product;
    updatedProduct.status = (updatedProduct.quantity > 0) ? 1 : 0;
    this.productService.updateProduct(updatedProduct);  

    if (this.productImage) {
      let imageFormData = new FormData();
      imageFormData.append('file', this.productImage, this.productImage.name)
      this.imageService.uploadProductImage(imageFormData, this.imageName);
    }
  }

  onFileSelected(event){
    this.productImage = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsDataURL(this.productImage);
    fileReader.onload = (event: any) =>{
      this.imageUrl = event.target.result;
    }
  }
}
