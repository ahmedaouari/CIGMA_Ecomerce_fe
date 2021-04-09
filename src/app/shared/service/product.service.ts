import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';

const URL = 'http://localhost:8080/ecomm-ws/api/v0/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) { }

  getProducts() {
    return this.http.get(URL);
  }

  getProductById(id) {
    return this.http.get<Product>(`${URL}/${id}`);
  }
  addProduct(product: Product) {
    this.http.post(URL, product).subscribe(result => {
      this.router.navigate(['/admin']);
    });
  }
  updateProduct(id, product) {
    this.http.put(`${URL}/${id}`, product).subscribe(result => {
      this.router.navigate(['/admin']);
    });
  }
}
