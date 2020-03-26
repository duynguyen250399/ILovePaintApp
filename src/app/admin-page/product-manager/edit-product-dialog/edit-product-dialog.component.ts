import { Component, OnInit, Inject } from '@angular/core';
import { ProviderModel } from 'src/app/models/provider.model';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { ImageService } from 'src/app/services/image.service';
import * as uuid from 'uuid';
import { AddVolumeDialogComponent } from '../add-volume-dialog/add-volume-dialog.component';
import { ProductVolume } from 'src/app/models/product-volume.model';
import { ProductVolumeService } from 'src/app/services/product-volume.service';
import { ValidationPatterns } from 'src/helpers/helper';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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
  
  public imageChange = false;

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private productVolumeService: ProductVolumeService,
    private imageService: ImageService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public editProductForm: FormGroup

  ngOnInit() {
    console.log(this.data)
   
    this.editProductForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      quantity: [(this.data.productVolumes.length > 0) ? this.data.productVolumes[0].quantity : '', [
        Validators.required,
        Validators.pattern(ValidationPatterns.positiveNumberRegex)
      ]],
      volume: [''],
      price: [(this.data.productVolumes.length > 0) ? this.data.productVolumes[0].price : '', [
        Validators.required,
        Validators.pattern(ValidationPatterns.positiveNumberWithOneDotRegex)
      ]],
      providerId: [(this.data.provider) ? this.data.provider.id : null],
      categoryId: [(this.data.category) ? this.data.category.id : null],
      description: [this.data.description]
    })

    this.providerService.refreshProviderList();
    this.categoryService.refreshCategoryList();
    
    this.imageUrl = this.data.image;
  }

  updateProduct(){   

    let formData = new FormData();
    formData.append('id', this.editProductForm.get('id').value);
    formData.append('name', this.editProductForm.get('name').value);
    formData.append('description', this.editProductForm.get('description').value);
    formData.append('providerId', this.editProductForm.get('providerId').value);
    formData.append('categoryId', this.editProductForm.get('categoryId').value);

    if (this.productImage && this.imageChange) {
      this.imageName = Date.now().toString() + '-iLovePaint-' + uuid.v4() + '-' + this.productImage.name;

      this.uploadPath = '/uploads/images/products/'+ this.imageName;
      
      formData.append('image', this.uploadPath);
    }

   
    this.productService.updateProduct(formData);  

    // Update product volume: price, volume value and quantity
    let productVolume: ProductVolume = this.data.productVolumes
    .filter(pv => pv.id == this.editProductForm.get('volume').value)[0];

    let newProductVolume: ProductVolume = {
      id: this.editProductForm.get('volume').value,
      price: this.editProductForm.get('price').value,
      quantity: this.editProductForm.get('quantity').value,
      volumeValue: productVolume.volumeValue,
      productID: this.editProductForm.get('id').value,
      status: (this.editProductForm.get('quantity').value > 0) ? 1 : 0
    };

    this.productVolumeService.updateProductVolume(newProductVolume)
    .subscribe(
      res =>{
        console.log(res);
      },
      err => console.log(err)
    )

    // update product image
    if (this.productImage && this.imageChange) {
      let imageFormData = new FormData();
      imageFormData.append('file', this.productImage, this.productImage.name);
      this.imageService.updateImage(imageFormData, this.editProductForm.get('id').value, this.imageName);
    }

    this.snackBarService.showSnackBar('Product edited', 'CLOSE');

  }

  onFileSelected(event){
    this.productImage = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsDataURL(this.productImage);
    fileReader.onload = (event: any) =>{
      this.imageUrl = event.target.result;
    }
    this.imageChange = true;
  }

  onVolumeChange(event){
    let volumeId = event.target.value;
    if(!volumeId){
      return;
    }
   
    let productVolume = this.data.productVolumes.filter(pv => pv.id == volumeId)[0];
    
    this.editProductForm.get('price').setValue(productVolume.price);
    this.editProductForm.get('quantity').setValue(productVolume.quantity);
  }

  openAddVolumeDialog(productId){
    let dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50%';
    dialogConfig.data = productId;

    let dialogRef = this.dialog.open(AddVolumeDialogComponent, dialogConfig);
    
  }
}
