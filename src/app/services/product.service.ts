import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
