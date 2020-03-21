import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class ProductVolumeService {

  constructor(private http: HttpClient) { }

  getVolumeById(id){
    return this.http.get(DataConfig.baseUrl + '/products/volumes/' + id);
  }
}
