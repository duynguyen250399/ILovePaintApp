import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'https://localhost:44385/api/products';

  constructor(private http: HttpClient) { }

  getProductList(){
    return this.http.get(this.url);
  }

  getProductById(id){
    return this.http.get(this.url + '/' + id);
  }

  createProduct(product: Product){
    return this.http.post(DataConfig.baseUrl + '/products', product);
  }

  deleteProduct(id){
    return this.http.delete(DataConfig.baseUrl + '/products/' + id);
  }
}
