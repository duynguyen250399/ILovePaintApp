import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private userService: UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      let authToken = localStorage.getItem('jwt');
      if(authToken){
        let allowedRoles = next.data['allowedRoles'] as Array<string>

        if(allowedRoles){
          let rolesMatched = this.userService.rolesMatch(allowedRoles);
          
          if(rolesMatched){
            return true;
          }
          else{
            this.router.navigate(['forbidden']);
            return false;
          }
        }
        else{
          this.router.navigate(['forbidden']);
            return false;
        }
      }
      else{
        this.router.navigate(['user-login']);
        return false;
      }
      
  }
  
}
