import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from '../services/provider.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  public providerList = [];
  public categoryList = [];

  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private categoryService: CategoryService) { }

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
    .subscribe(data => this.providerList = data as []);

    this.categoryService.getCategoryList()
    .subscribe(data => this.categoryList = data as []);
  }

}
