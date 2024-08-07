import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Angular Template 1',
      description: 'A sleek and modern Angular template.',
      imageUrl: 'assets/products/sample-product-01.png',
      detailsUrl: '#',
      category: 'angular'
    },
    {
      id: 2,
      name: 'React Template 1',
      description: 'A versatile React template.',
      imageUrl: 'assets/products/sample-product-02.png',
      detailsUrl: '#',
      category: 'react'
    },
    {
      id: 3,
      name: 'HTML Template 1',
      description: 'A creative HTML template.',
      imageUrl: 'assets/products/sample-product-03.png',
      detailsUrl: '#',
      category: 'html'
    }
    // Add more products
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
