import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';
import { ProductVolume } from '../models/product-volume.model';


@Injectable({
  providedIn: 'root'
})
export class ProductVolumeService {

  constructor(private http: HttpClient) { }

  getVolumeById(id){
    return this.http.get(DataConfig.baseUrl + '/products/volumes/' + id);
  }

  addProductVolume(productVolume: ProductVolume){
    return this.http.post(DataConfig.baseUrl + '/productvolumes', productVolume);
  }

  updateProductVolume(productVolume: ProductVolume){
    return this.http.put(DataConfig.baseUrl + '/productvolumes', productVolume);
  }
}
