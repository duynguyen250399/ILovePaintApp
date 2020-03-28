import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  public colors: Color[] = [];

  getColors(productId){
    return this.http.get(DataConfig.baseUrl + '/colors/' + productId);
  }

  loadColors(productId){
    this.http.get(DataConfig.baseUrl + '/colors/' + productId)
    .subscribe(
      res =>{
        this.colors = res as Color[];
      },
      err =>{
        console.log(err);
      }
    )
  }

  addColor(color: Color){
    return this.http.post(DataConfig.baseUrl + '/colors', color);
  }

  updateColor(color: Color){
    return this.http.put(DataConfig.baseUrl + '/colors', color);
  }

  deleteColor(id){
    return this.http.delete(DataConfig.baseUrl + '/colors/' + id);
  }
}
