import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../shared/service/user.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', Validators.required]
    });
  }
  onResetPassword() {
    const obj = {email: this.resetForm.controls.email.value}
    this.userService.requestReset(obj);
  }
}
