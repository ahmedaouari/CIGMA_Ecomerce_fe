import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../shared/service/cart.service';
import {Product} from '../../../shared/models/product';
import {UserService} from '../../../shared/service/user.service';
import {User} from '../../../shared/models/user.model';
import {Purchase} from '../../../shared/models/purchase';
import {Customer} from '../../../shared/models/customer';
import {Order} from '../../../shared/models/order';
import {PurchaseService} from '../../../shared/service/purchase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: Product[];
  totalPrice = 0;
  user: any;
  userID: string;
  totalQuantity: number;
  constructor(private cartService: CartService, private userService: UserService,
              private purchaseService: PurchaseService, private router: Router) { }

  ngOnInit() {
    this.userID = JSON.parse(this.userService.getUserId());
    this.cartService.getProductsOfBasket().subscribe((products: Product[]) => {
      this.products = products;
      products.forEach(p => this.totalPrice += p.unitPrice);
    });
    this.userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
    });
    this.cartService.getBasketTotal().subscribe((qte: number) => {
      this.totalQuantity = qte;
    });
  }

  onValidate() {
    const purchase = new Purchase();
    const customer = new Customer();
    customer.email = this.user.email;
    customer.userID = this.userID;
    const order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const ordersArray = this.products.map(({unitPrice, unitsInStock, productId}) => ({unitPrice, quantity: unitsInStock, productId}));
    purchase.customer = customer;
    order.orderItems = ordersArray;
    purchase.order = order;
    this.purchaseService.purchase(purchase).subscribe(result => {
    }, (err) => {
      console.log(err);
    }, () => {
      this.router.navigate(['/products']);
      this.cartService.toRefresh(true);
    });
  }
}
