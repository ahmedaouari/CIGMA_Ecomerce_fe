import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alertSuccess = false;
  alertFail = false;
  toLogin = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  submit=false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^((\\+212?)|0)?[0-9]{10}$")]],
      nickname: ['', Validators.required],
    });
   
    //this.userService.getUserById("Eu0HJyYqYn1yyTJaJq01gkGn43OXy5").subscribe(result => console.log(result));
  }

  switchToSignUp() {
    this.toLogin = !this.toLogin;
  }

  onSignIn() {
    this.userService.signIn(this.signInForm.value);
  }

  onSignUp() {
    if(this.signUpForm.valid){
      this.userService.signUp(this.signUpForm.value).subscribe(feedback => {
      }, (err) => {
        this.alertFail = true;
        console.log(err);
      }, () => {
        this.alertSuccess = true;
        setTimeout(() => {
          
          this.toLogin=true;
        }, 500);
      });

    }else{
      console.log('not valid')
     this.submit=true;
    }
  }
  redirectToResetPage() {
    this.router.navigate(['/request/reset-password']);
  }

}
