import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../models/registration.model';
import { DataConfig } from 'src/config/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerAccount(model: Registration){
    return this.http.post(DataConfig.baseUrl + '/users', model);
  }
}
