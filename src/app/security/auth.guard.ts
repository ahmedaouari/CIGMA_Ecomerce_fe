import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UserService} from '../shared/service/user.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isUserAuthenticated().pipe(map((response: boolean) => {
       if (response) {
         return true;
       } else {
         this.router.navigate(['/login']);
         return false;
       }
    }), catchError((error) => {
      this.router.navigate(['/login']);
      return of(false);
    }));
  }

}
