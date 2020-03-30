import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { getPayload } from 'src/helpers/helper';
import { UserProfile } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    public loading = false;
    public avatarFile: File;
    public fileChanged = false;
    public avatar: any;

    public profile: UserProfile;

  ngOnInit() {
    this.avatar = this.data.image ? this.data.image : '../../../assets/images/image_default.png';
    this.profile = this.data;
  }

  onSave() {
    this.loading = true;
    let formData = new FormData();
    let userID = getPayload().nameid;
    formData.append('userID', userID);
    formData.append('fullName', this.profile.fullName);
    formData.append('address', this.profile.address);
    formData.append('phoneNumber', this.profile.phoneNumber);
    formData.append('gender', this.profile.gender == true ? 'true' : 'false');
    let avatar = (this.avatarFile && this.fileChanged) ? this.avatarFile : null;
    formData.append('avatar', avatar);

    this.userService.updateUserProfile(formData)
    .subscribe(
      res => {
        console.log('data updated', res);
        this.loading = false;
        this.dialogRef.close();
        location.reload();
      },
      err =>{
        console.log(err);
        this.loading = false;
      }
    )
  }

  onImageSelected(event) {
    let reader = new FileReader();
    this.avatarFile = event.target.files[0];

    reader.readAsDataURL(this.avatarFile);
    reader.onload = (event: any) => {
      this.avatar = event.target.result;
    }
    this.fileChanged = true;
    console.log(this.fileChanged);
  }

  closeDialog(){
    this.dialogRef.close();
  }


}
