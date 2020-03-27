import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserProfile } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private router: Router) { }

  // public profileForm: FormGroup;
  public profile: UserProfile;
  public avatar: string;
  public role: string;

  ngOnInit() {
    let authToken = localStorage.getItem('jwt');
    if(!authToken){
      this.router.navigate(['user-login']);
    }

    this.userService.getUserProfile()
    .subscribe(
      res => {
        this.profile = res as UserProfile;
        this.avatar = this.profile.image ? this.profile.image : '../../../assets/images/image_default.png';

        // process user role
        let payloadToken = authToken.split('.')[1];
        let payload = JSON.parse(window.atob(payloadToken));
        this.role = payload.role;
      },
      err => console.log(err)
    )
  }

}
