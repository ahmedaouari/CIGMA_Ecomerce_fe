import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../../shared/service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../shared/models/product';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {
  id: string;
  product: Product;
  editMode = false;
  productForm: FormGroup;
  constructor(private productService: ProductService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name : [''],
      unitPrice: [''],
      sku: [''],
      unitsInStock: ['']
    });
    this.editMode = false;
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.editMode = true;
      this.productService.getProductById(this.id).subscribe((product: Product) => {
        this.product = product;
        this.productForm.patchValue( { name: product.name, unitPrice: product.unitPrice,
        unitsInStock: product.unitsInStock}) ;
      });
    }

  }

  onValidate() {
  if (!this.editMode && this.id == null ) {
    this.productService.addProduct(this.productForm.value);
  } else {
    this.productService.updateProduct(this.id, this.productForm.value);
  }
  }

}
