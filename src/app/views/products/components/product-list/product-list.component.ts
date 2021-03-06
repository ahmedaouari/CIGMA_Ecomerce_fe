import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../../shared/models/product';
import {ProductService} from '../../../../shared/service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
  selectProductAndNavigate(id) {
    this.router.navigate(['/cart/' + id]);
  }
}
