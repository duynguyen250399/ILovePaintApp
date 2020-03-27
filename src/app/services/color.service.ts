import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  getColors(productId){
    return this.http.get(DataConfig.baseUrl + '/colors/' + productId);
  }
}
