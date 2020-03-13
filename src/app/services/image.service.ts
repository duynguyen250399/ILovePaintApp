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

  getImage(id){
    return this.http.get(DataConfig.baseUrl + '/images/product/' + id);
  }
}
