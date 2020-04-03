import { Component, OnInit, Inject } from '@angular/core';
import { ProviderModel } from 'src/app/models/provider.model';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { ImageService } from 'src/app/services/image.service';
import { AddVolumeDialogComponent } from '../../import-product/add-volume-dialog/add-volume-dialog.component';
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
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public editProductForm: FormGroup
  public loading = false;

  ngOnInit() {
    console.log(this.data)

    this.editProductForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      quantity: [(this.data.productVolumes.length > 0) ? this.data.productVolumes[0].quantity : ''],
      volume: [''],
      price: [(this.data.productVolumes.length > 0) ? this.data.productVolumes[0].price : ''],
      providerId: [(this.data.provider) ? this.data.provider.id : null],
      categoryId: [(this.data.category) ? this.data.category.id : null],
      description: [this.data.description]
    })

    this.providerService.refreshProviderList();
    this.categoryService.refreshCategoryList();

    this.imageUrl = this.data.image;
  }

  updateProduct() {
    this.loading = true;
    let formData = new FormData();  
    formData.append('productName', this.editProductForm.get('name').value.trim());
    formData.append('description', this.editProductForm.get('description').value.trim());
    formData.append('providerID', this.editProductForm.get('providerId').value);
    formData.append('categoryID', this.editProductForm.get('categoryId').value);
    formData.append('image', this.productImage);

    let productId = this.editProductForm.get('id').value;
    this.productService.updateProduct(productId, formData)
    .subscribe(
      res =>{    
        this.productService.refreshProductList();
        this.loading = false;
        this.snackBarService.showSnackBar('Product edited', 'CLOSE');
        this.dialogRef.close();
        location.reload();
      },
      err =>{
        console.log(err);    
      }
    )
    

  }

  onFileSelected(event) {
    this.productImage = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsDataURL(this.productImage);
    fileReader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    this.imageChange = true;
  }

}
