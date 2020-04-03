import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile.model';
import { getPayload } from 'src/helpers/helper';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private router: Router) { }

  // public profileForm: FormGroup;
  public profile: UserProfile;
  public avatar: any;
  public role: string;
  public fileChanged = false;
  public avatarFile: File;

  public loading = false;

  ngOnInit() {
    let authToken = localStorage.getItem('jwt');
    if (!authToken) {
      this.router.navigate(['user-login']);
    }

    this.userService.getUserProfile()
      .subscribe(
        res => {       
          this.profile = res as UserProfile;
          this.avatar = this.profile.image ? this.profile.image : '../../../assets/images/image_default.png';

          // process user role
          let payload = getPayload();
          this.role = payload.role;
        },
        err => console.log(err)
      )
  }


  openEditProfileDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '600px';
    dialogConfig.disableClose = true;
    dialogConfig.data = this.profile;

    this.dialog.open(EditProfileDialogComponent, dialogConfig);
  }

}
