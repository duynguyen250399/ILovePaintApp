import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { getPayload } from 'src/helpers/helper';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  public loginForm: FormGroup;
  public loginErr: string;
  public loading = false;

  ngOnInit() {
    let authToken = localStorage.getItem('jwt');
    if(authToken){
      this.router.navigate(['/']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  get usernameControl(){
    return this.loginForm.get('username');
  }

  get passwordControl(){
    return this.loginForm.get('password');
  }

  login(){
    this.loginErr = '';
    this.loading = true;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
       (res: any) => {
          this.loginErr = '';
          console.log(res)
          localStorage.setItem('jwt', res.token);
          this.userService.loadUserProfile();
          this.loading = false;

          let role = getPayload().role;
          if(role == 'Admin'){
            this.router.navigate(['admin']);
          }
          else{
            this.router.navigate(['/']);
          }
          
        },
        err => {
          this.loading = false;
          console.log(err);
          this.loginErr = err.error.message;
        }
      )
    }
  }

}
