import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadProductImage(formData: FormData, imageName: string){
    this.http.post(DataConfig.baseUrl + '/images/product/' + imageName, formData)
    .subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  updateImage(formData: FormData, productId, imageName: string){
    this.http.put(DataConfig.baseUrl + '/images/product/' + productId + '/' + imageName, formData)
    .subscribe(
      res => console.log(res),
      error => console.log(error)
    )
  }

  deleteImage(url){
    this.http.delete(DataConfig.baseUrl + '/images/product/' + url)
    .subscribe(
      res => {
        console.log('imaged removed');
      },
      error => console.log(error)
    )
  }

  getImage(id){
    return this.http.get(DataConfig.baseUrl + '/images/product/' + id);
  }
}
