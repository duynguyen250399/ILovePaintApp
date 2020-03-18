import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shipper } from '../models/shipper.model';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(private http: HttpClient) { }

  public shipperList: Shipper[] = [];

  loadShipperList(){
    this.http.get(DataConfig.baseUrl + '/shippers')
    .subscribe(
      data => this.shipperList = data as Shipper[],
      error => console.log(error)
    )
  }
}
