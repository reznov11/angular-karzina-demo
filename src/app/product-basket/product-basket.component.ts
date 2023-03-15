import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.scss'],
})
export class ProductBasketComponent implements OnInit {
  public myProducts: Product[] = [
    {
      id: 1,
      name: 'Cart Product 1',
      description: 'Description of Cart Product 1',
      price: 10.99,
      imageUrl: 'https://via.placeholder.com/150',
      quantity: 0,
      total: 0,
    },
    {
      id: 2,
      name: 'Cart Product 2',
      description: 'Description of Cart Product 2',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/150',
      quantity: 0,
      total: 0,
    },
    {
      id: 3,
      name: 'Cart Product 3',
      description: 'Description of Cart Product 3',
      price: 5.99,
      imageUrl: 'https://via.placeholder.com/150',
      quantity: 0,
      total: 0,
    },
  ];

  cartProducts: Observable<Product[]>;
  total: Observable<number> = this.productBasketService.totalSum;

  constructor(private productBasketService: ProductService) {
    this.cartProducts = this.productBasketService.getProducts();
  }

  ngOnInit() {}

  addProductToCart(product: Product) {
    this.productBasketService.addProduct(product);
  }

  increaseQuantity(product: Product) {
    this.productBasketService.increaseQuantity(product);
  }

  decreaseQuantity(product: Product) {
    this.productBasketService.decreaseQuantity(product);
  }

  removeProduct(product: Product) {
    this.productBasketService.removeProduct(product);
  }
}
