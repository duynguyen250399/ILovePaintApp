import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from "../../config/data";
import { ProviderModel } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  public providerList: ProviderModel[];

  refreshProviderList(){
    this.http.get(DataConfig.baseUrl + '/providers')
    .subscribe(
      data => this.providerList = data as ProviderModel[],
      error => console.log(error)
    )
  }

  addProvider(provider){
    this.http.post(DataConfig.baseUrl + '/providers', provider)
    .subscribe(
      data =>{
        this.refreshProviderList();
      },
      error => console.log(error)
    )
  }

  deleteProvider(id){
    this.http.delete(DataConfig.baseUrl + '/providers/' + id)
    .subscribe(
      data => this.refreshProviderList(),
      error => console.log(error)
    )
  }

  
}
