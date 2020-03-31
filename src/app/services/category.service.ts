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

  public currentChunkIndex = 0;
  public chunkSize = 5;
  public pageItems = [];
  public stopNext = false;
  public stopPrev = true;

  getCategoryList(){
    return this.http.get(DataConfig.baseUrl + '/categories');
  }

  getCategoryChunks() {
    if (!this.categoryList) {
      return [];
    }

    return this.categoryList
      .slice(this.currentChunkIndex * this.chunkSize,
        (this.currentChunkIndex * this.chunkSize) + this.chunkSize);
  }

  refreshCategoryList(){
    this.http.get(DataConfig.baseUrl + '/categories')
    .subscribe(
      data => {
        this.categoryList = data as Category[];
        this.updateState();
      },
      error => console.log(error)
      );
  }

  updateState() {
    let maxChunks = Math.ceil(this.categoryList.length / this.chunkSize);
    if (this.pageItems.length > 0) {
      this.pageItems = [];
    }
    for (let i = 0; i < maxChunks; i++) {
      this.pageItems.push(i + 1);
    }
    if (maxChunks === 1) {
      this.stopNext = true;
      this.stopPrev = true;
    }

    if (this.currentChunkIndex > 0) {
      this.currentChunkIndex = this.currentChunkIndex - 1;
    }

    if (this.currentChunkIndex <= 0) {
      this.stopPrev = true;
      this.stopNext = false;
    }

    if (this.currentChunkIndex >= this.pageItems.length - 1) {
      this.stopNext = false;
      this.stopNext = true;
    }
  }

  addCategory(category){
    return this.http.post(DataConfig.baseUrl + '/categories', category);   
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
    return this.http.put(DataConfig.baseUrl + '/categories', category);
  }
}
