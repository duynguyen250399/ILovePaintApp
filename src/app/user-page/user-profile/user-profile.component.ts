import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  public user: any;

  ngOnInit() {
    let authToken = localStorage.getItem('jwt');
    if(!authToken){
      this.router.navigate(['user-login']);
    }
    this.userService.loadUserProfile();    
  }

}
