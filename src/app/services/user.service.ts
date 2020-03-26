import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registration } from '../models/registration.model';
import { DataConfig } from 'src/config/data';
import { UserProfile } from '../models/user-profile.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router) { }

  public currentUserProfile: UserProfile;

  registerAccount(model: Registration) {
    return this.http.post(DataConfig.baseUrl + '/users', model);
  }

  loadUserProfile() {
    let token = localStorage.getItem('jwt');

    if (token) {
      let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.get(DataConfig.baseUrl + '/users/profile', { headers: headers })
        .subscribe(
          res => {
            console.log(res);
            this.currentUserProfile = res as UserProfile;
          },
          err => {
            this.currentUserProfile = null;
            console.log(err);
          }
        )
    }
    else{
      this.currentUserProfile = null;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['user-login']);
    this.loadUserProfile();
  }

  rolesMatch(roles) {
    let token = localStorage.getItem('jwt');
    if (!token) {
      return false;
    }

    let payloadToken = token.split('.')[1];
    let payload = JSON.parse(window.atob(payloadToken));
    console.log('roles', roles)
    console.log('role', payload.role)

    for (let i = 0; i < roles.length; i++) {
      if (payload.role != roles[i]) {
        return false;
      }
    }

    return true;
  }
}
