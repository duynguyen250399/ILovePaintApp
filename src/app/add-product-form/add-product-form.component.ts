import { Component, OnInit, Provider } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from '../services/provider.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { ProviderModel } from "../models/provider.model";
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  public providerList : ProviderModel[];
  public categoryList : Category[];
  public success = false;

  private selectedProvider : ProviderModel;
  private selectedCategory: Category;

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private productService: ProductService) { }

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
    this.providerService.getProviderList()
      .subscribe(data => this.providerList = data as ProviderModel[]);

    this.categoryService.getCategoryList()
      .subscribe(data => this.categoryList = data as Category[]);
  }

  addProduct(){   

    let product : Product = {
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      weight: this.addProductForm.value.weight,
      quantity: this.addProductForm.value.quantity,
      status: this.addProductForm.value.status,
      providerId : this.addProductForm.value.provider,
      categoryId: this.addProductForm.value.category
    };
    
    this.productService.createProduct(product)
    .subscribe(
      data => this.success = true,
      error => this.success = false
      )
  }

  onProviderChange(){
    let selectedId = this.addProductForm.value.provider;
    this.selectedProvider = this.providerList
    .find(provider => provider.id == selectedId);
  
  }

  onCategoryChange(){
    let selectedId = this.addProductForm.value.provider;
    this.selectedCategory = this.categoryList
    .find(category => category.id == selectedId);
   
  }

}
