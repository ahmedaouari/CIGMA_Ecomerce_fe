import {Injectable} from '@angular/core';
import {OrderItem} from '../models/order-item';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../models/cart';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Product} from '../models/product';
const URL = 'http://localhost:8080/ecomm-ws/api/v0/carts';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  refetchCarts = new Subject<boolean>();
  constructor(private http: HttpClient) {
  }
  addCart(cart: Cart) {
    return this.http.post(URL, cart);
  }

  toRefresh(value) {
    this.refetchCarts.next(value);
  }
  getBasketTotal() {
    const id = JSON.parse(localStorage.getItem('userID'));
    return this.http.get(`${URL}/${id}`);
  }

  getProductsOfBasket() {
    const id = JSON.parse(localStorage.getItem('userID'));
    return this.http.get<Product[]>(`${URL}/basket/${id}`);
  }
}
