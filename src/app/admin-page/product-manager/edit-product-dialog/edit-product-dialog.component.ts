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
import * as uuid from 'uuid';

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
  public imageName: string;
  public uploadPath: string;

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

    let formData = new FormData();
    formData.append('id', this.editProductForm.get('id').value);
    formData.append('name', this.editProductForm.get('name').value);
    formData.append('description', this.editProductForm.get('description').value);
    formData.append('price', this.editProductForm.get('price').value);
    formData.append('weight', this.editProductForm.get('weight').value);
    formData.append('quantity', this.editProductForm.get('quantity').value);
    let status = (this.editProductForm.get('quantity').value > 0) ? 1 : 0;
    formData.append('status', status.toString());
    formData.append('manufactureDate', this.editProductForm.get('manufactureDate').value);
    formData.append('providerId', this.editProductForm.get('providerId').value);
    formData.append('categoryId', this.editProductForm.get('categoryId').value);

    if (this.productImage) {
      this.imageName = Date.now().toString() + '-iLovePaint-' + uuid.v4() + '-' + this.productImage.name;
      this.uploadPath = '/uploads/images/products/'+ this.imageName;
      formData.append('image', this.uploadPath);
    }

    this.productService.updateProduct(formData);  

    if (this.productImage) {
      let imageFormData = new FormData();
      imageFormData.append('file', this.productImage, this.productImage.name);
      this.imageService.updateImage(imageFormData, this.editProductForm.get('id').value, this.imageName);
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
