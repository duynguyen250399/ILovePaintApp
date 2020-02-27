import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from "../../config/data";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getProviderList(){
    return this.http.get(DataConfig.baseUrl + '/providers');
  }
}
