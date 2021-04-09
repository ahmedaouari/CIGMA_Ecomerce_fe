import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../shared/service/user.service';
import {ProductService} from '../../../../shared/service/product.service';
import {CartService} from '../../../../shared/service/cart.service';
import {Cart} from '../../../../shared/models/cart';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() basket = 0;
  constructor( private cartService: CartService) {
  }

  ngOnInit() {
  }

}
