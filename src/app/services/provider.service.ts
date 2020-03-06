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

  
}
