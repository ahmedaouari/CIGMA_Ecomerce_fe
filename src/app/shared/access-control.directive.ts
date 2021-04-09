import {Directive, ElementRef, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {Roles} from './roles';

@Directive({
  selector: '[appAccessControl]'
})
export class AccessControlDirective implements OnInit {

  constructor(private elementRef: ElementRef, private userService: UserService) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkAccess();
  }
  checkAccess() {
    const roleUser = this.userService.getUserRole();
    this.elementRef.nativeElement.style.display = roleUser === Roles.Admin  ? 'block' : 'none';
  }

}
