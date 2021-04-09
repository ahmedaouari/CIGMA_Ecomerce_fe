import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../shared/service/product.service';
import {Product} from '../../../shared/models/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  editProduct(id) {
    this.router.navigate(['/admin/product/edit/', id]);
  }

  toAddProduct() {
    this.router.navigate(['/admin/product/create' ]);
  }
}
