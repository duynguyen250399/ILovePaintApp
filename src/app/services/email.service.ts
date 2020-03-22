import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendOrderConfirmEmail(orderEmail){
    this.http.post(DataConfig.baseUrl + '/email/order-confirm', orderEmail)
    .subscribe(
      data => {
        console.log(data);  
      },
      error => console.log(error)
    )
  }
}
