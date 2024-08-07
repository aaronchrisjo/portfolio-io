import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Template One',
      description: 'A sleek and modern template to showcase your work beautifully. Ideal for professionals and creatives.',
      imageUrl: 'assets/products/sample-product-01.png',
      detailsUrl: '#'
    },
    {
      id: 2,
      name: 'Template Two',
      description: 'A versatile template with a clean design, perfect for showcasing portfolios and personal projects.',
      imageUrl: 'assets/products/sample-product-02.png',
      detailsUrl: '#'
    },
    {
      id: 3,
      name: 'Template Three',
      description: 'A creative template with dynamic features, ideal for designers and artists looking to make a statement.',
      imageUrl: 'assets/products/sample-product-03.png',
      detailsUrl: '#'
    }
    // Add more products as needed
  ];

  getProducts(): Observable<Product[]>{
    return of(this.products);
  }
}
