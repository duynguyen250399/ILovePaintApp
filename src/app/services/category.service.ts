import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from "../../config/data";
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  public categoryList: Category[];

  getCategoryList(){
    return this.http.get(DataConfig.baseUrl + '/categories');
  }

  refreshCategoryList(){
    this.http.get(DataConfig.baseUrl + '/categories')
    .subscribe(
      data => this.categoryList = data as Category[],
      error => console.log(error)
      );
  }

  addCategory(category){
    this.http.post(DataConfig.baseUrl + '/categories', category)
    .subscribe(
      data =>{
        this.refreshCategoryList();
      },
      error => console.log(error)
    )
  }

  deleteCategory(id){
    this.http.delete(DataConfig.baseUrl + '/categories/' + id)
    .subscribe(
      data => {
        console.log('category deleted: ', data);
        this.categoryList = this.categoryList.filter(category => category.id != id);
      },
      error => console.log(error)
    )
  }

  updateCategory(category){
    this.http.put(DataConfig.baseUrl + '/categories', category)
    .subscribe(
      data => this.refreshCategoryList(),
      error => console.log(error)
    )
  }
}
