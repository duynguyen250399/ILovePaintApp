import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { getPayload, ValidationPatterns } from 'src/helpers/helper';
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
    this.userService.getUserProfile()
    .subscribe(
      res => {
        this.profile = res as UserProfile;
      },
      err =>{
        console.log(err);
      }
    )
  }

  // data validation
  isValidFullName(){
    return this.profile.fullName.trim().length > 3 
    && this.profile.fullName.match(ValidationPatterns.noSpecialCharsWithVietnameseRegex);
  }

  isValidAddress(){
    return this.profile.address.trim();
  }

  isValidPhoneNumber(){
    return this.profile.phoneNumber.trim() 
    && this.profile.phoneNumber.match(ValidationPatterns.phoneNumberRegex);
  }

  isValid(){
    return this.isValidFullName() && this.isValidAddress() && this.isValidPhoneNumber();
  }
  

  onSave() {
    this.loading = true;
    let formData = new FormData();
    let userID = getPayload().nameid;
    formData.append('userID', userID);
    formData.append('fullName', this.profile.fullName.trim());
    formData.append('address', this.profile.address.trim());
    formData.append('phoneNumber', this.profile.phoneNumber);
    formData.append('gender', this.profile.gender == 'true' ? 'true' : 'false');
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
  }

  closeDialog(){
    this.dialogRef.close();
  }


}
