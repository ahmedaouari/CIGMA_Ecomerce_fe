import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../../shared/service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../../shared/service/cart.service';
import {Cart} from '../../../shared/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product: Product;
  totalPrice = 0;
  qte = 0;
  idProduct: string;
  constructor(private productService: ProductService, private route: ActivatedRoute,
              private router: Router, private cartService: CartService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.idProduct = id;
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
    });
  }

  calculatePrice(event) {
    this.qte = event.target.value;
    this.totalPrice = event.target.value * this.product.unitPrice;
  }

  addToBasket() {
    const userId = JSON.parse(localStorage.getItem('userID'));
    const cart = new Cart();
    cart.productId = this.idProduct;
    cart.quantity = this.qte;
    cart.userID = userId;
    this.cartService.addCart(cart).subscribe(result => {
      this.router.navigate(['/products']);
      this.cartService.toRefresh(true);
    }, (err) => console.log(err.message));
  }

}
