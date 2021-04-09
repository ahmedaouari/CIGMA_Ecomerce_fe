import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/service/user.service';
import {ProductService} from './shared/service/product.service';
import {CartService} from './shared/service/cart.service';
import {Cart} from './shared/models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  basket = 0;
  constructor(private userService: UserService, private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getBasket();
    this.cartService.refetchCarts.subscribe((value: boolean) => {
      if (value) {
        this.getBasket();
      }
    });
  }
  getBasket() {
    this.cartService.getBasketTotal().subscribe((qte: number) => {
      this.basket = qte;
    });
  }

  logout(): void {
    this.userService.logout();
  }
}
