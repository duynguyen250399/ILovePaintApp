import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from "../../config/data";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  getCategoryList(){
    return this.http.get(DataConfig.baseUrl + '/categories');
  }
}
