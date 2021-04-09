import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../models/purchase';

const URL = 'http://localhost:8080/ecomm-ws/api/v0/checkout';
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  purchase(purchase: Purchase) {
    return this.http.post(URL, purchase);
  }
}
