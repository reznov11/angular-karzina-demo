import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private readonly PRODUCTS_STORAGE_KEY = 'products-cart';

  private totalSubject = new BehaviorSubject<number>(0);
  totalSum = this.totalSubject.asObservable();

  constructor() {
    const storedProducts = localStorage.getItem(this.PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
    this.productsSubject.next(this.products);

    if (storedProducts && storedProducts.length) {
      this.updateProducts();
    }
  }

  getProducts() {
    return this.productsSubject.asObservable();
  }

  addProduct(product: Product) {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index === -1) {
      product.quantity += 1;
      product.total += product.quantity * product.price;
      this.products.push(product);
    } else {
      const product$ = this.products[index];
      product$.quantity += 1;
      product$.total = product$.quantity * product$.price;
    }
    this.updateProducts();
  }

  increaseQuantity(product: Product) {
    if (Array.isArray(this.products) && this.products.length > 0) {
      const index = this.products.findIndex((p) => p.id === product.id);
      const product$ = this.products[index];
      if (product$ && index !== -1) {
        product$.quantity++;
        product$.total = product$.quantity * product$.price;
        this.updateProducts();
      }
    }
  }

  decreaseQuantity(product: Product) {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      const product$ = this.products[index];
      const currentQuantity = product$.quantity;
      if (currentQuantity > 1) {
        if (this.products.length > index) {
          product$.quantity--;
          product$.total = product$.quantity * product$.price;
          this.updateProducts();
        }
      } else {
        this.removeProduct(product);
      }
    }
  }

  removeProduct(product: Product) {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.updateProducts();
    }
  }

  getTotal(): number {
    let pdsSum = 0;
    this.products.forEach((p) => {
      if (p.quantity && p.price) {
        pdsSum += p.quantity * p.price;
      }
    });
    return pdsSum;
  }

  private updateProducts() {
    localStorage.setItem(this.PRODUCTS_STORAGE_KEY, JSON.stringify(this.products));

    // Emit new total value
    this.totalSubject.next(this.getTotal());

    // Emit new products object
    this.productsSubject.next(this.products);
  }
}
