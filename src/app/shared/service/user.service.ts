import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Login} from '../models/login.model';
import {LoginResponse} from '../models/login-response.model';
import {User} from '../models/user.model';
const URL = 'http://localhost:8080/ecomm-ws';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserById(id) {
    return this.http.get(`${URL}/api/v0/users/${id}`);
  }

  signUp(user: User) {
    return this.http.post(`${URL}/api/v0/users`, user);
  }
  signIn(login: Login): void {
    this.http.post(`${URL}/signin`, login).subscribe((response: LoginResponse) => {
      this.verifyToken(response);
    });
  }

  verifyToken(response): void {
    localStorage.clear();
    localStorage.setItem('userID', JSON.stringify(response.userID));
    localStorage.setItem('token', JSON.stringify(response.token));
    localStorage.setItem('role', JSON.stringify(response.role));
    this.router.navigateByUrl('/products');
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }
  isUserAuthenticated() {
      const userId = JSON.parse(this.getUserId());
      return this.http.get(`${URL}/api/v0/users/logged/` + userId);
  }

  getUserId(): string {
    return localStorage.getItem('userID');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getUserRole() {
    return JSON.parse(localStorage.getItem('role'));
  }
  requestReset(obj) {
     this.http.post(`${URL}/api/v0/users/password-reset-request`, obj).subscribe(result => console.log(result));
  }
  resetPassword(token) {
    this.http.post(`${URL}/api/v0/users/password-reset?token=${token}`, null).subscribe(result => console.log(result));
  }
  hasToken() {
    return !! (localStorage.getItem('token') && localStorage.getItem('userID'));
  }
}
