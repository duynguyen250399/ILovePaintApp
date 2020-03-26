import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationPatterns } from 'src/helpers/helper';
import { Registration } from 'src/app/models/registration.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  public registrationForm: FormGroup;
  public validationErr: string;
  public loading = false;

  get usernameControl(){
    return this.registrationForm.get('username');
  }
  get passwordControl(){
    return this.registrationForm.get('password');
  }
  get confirmPasswordControl(){
    return this.registrationForm.get('confirmPassword');
  }
  get emailControl(){
    return this.registrationForm.get('email');
  }
  get fullNameControl(){
    return this.registrationForm.get('fullName');
  }
  get phoneNumberControl(){
    return this.registrationForm.get('phoneNumber');
  }
  get addressControl(){
    return this.registrationForm.get('address');
  }
  get birthdateControl(){
    return this.registrationForm.get('birthdate');
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(ValidationPatterns.usernameRegex)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(ValidationPatterns.passwordRegex)
      ]],
      confirmPassword: ['', [
        Validators.required        
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.noSpecialCharsWithVietnameseRegex)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(ValidationPatterns.phoneNumberRegex)
      ]],
      birthdate: [''],
      address: ['', [
        Validators.required
      ]]
    });
  }

  registerAccount(){
    this.validationErr = '';
    this.loading = true;
    let registrationModel: Registration = {
      username : this.usernameControl.value,
      password : this.passwordControl.value,
      email : this.emailControl.value,
      fullName : this.fullNameControl.value,
      phoneNumber : this.phoneNumberControl.value,
      address : this.addressControl.value,
      birthdate : this.birthdateControl.value
    };

    this.userService.registerAccount(registrationModel)
    .subscribe(
      res => {
        console.log(res);
        this.validationErr = '';
        this.loading = false;
        this.router.navigate(['register-success']);
      },
      err => {
        this.loading = false;
        console.log(err);
        this.validationErr = err.error.message;
      }
    )
  }

  matchPassword(){
    return this.passwordControl.value === this.confirmPasswordControl.value;
  }

}
