import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConfig } from 'src/config/data';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient,
    private router: Router) { }

  login(username, password){
    let loginModel = {
      username: username,
      password: password
    };

    return this.http.post(DataConfig.baseUrl + '/users/authenticate', loginModel);    
  }

}
