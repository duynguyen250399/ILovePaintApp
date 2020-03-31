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

  public currentChunkIndex = 0;
  public chunkSize = 5;
  public pageItems = [];
  public stopNext = false;
  public stopPrev = true;

  refreshProviderList(){
    this.http.get(DataConfig.baseUrl + '/providers')
    .subscribe(
      data => {
        this.providerList = data as ProviderModel[];
        this.updateState();
      },
      error => console.log(error)
    )
  }

  getProviderChunks(){
    if (!this.providerList) {
      return [];
    }

    return this.providerList
      .slice(this.currentChunkIndex * this.chunkSize,
        (this.currentChunkIndex * this.chunkSize) + this.chunkSize);
  }

  addProvider(provider){
    return this.http.post(DataConfig.baseUrl + '/providers', provider);  
  }

  deleteProvider(id){
    this.http.delete(DataConfig.baseUrl + '/providers/' + id)
    .subscribe(
      data => this.refreshProviderList(),
      error => console.log(error)
    )
  }

  updateProvider(provider : ProviderModel){
    return this.http.put(DataConfig.baseUrl + '/providers', provider); 
  }

  updateState() {
    let maxChunks = Math.ceil(this.providerList.length / this.chunkSize);
    if (this.pageItems.length > 0) {
      this.pageItems = [];
    }
    for (let i = 0; i < maxChunks; i++) {
      this.pageItems.push(i + 1);
    }
    if (maxChunks === 1) {
      this.stopNext = true;
      this.stopPrev = true;
    }

    if (this.currentChunkIndex > 0) {
      this.currentChunkIndex = this.currentChunkIndex - 1;
    }

    if (this.currentChunkIndex <= 0) {
      this.stopPrev = true;
      this.stopNext = false;
    }

    if (this.currentChunkIndex >= this.pageItems.length - 1) {
      this.stopNext = false;
      this.stopNext = true;
    }
  }

  
}
