import { Injectable } from '@angular/core';
import { Database, ref, query, limitToLast, get, DatabaseReference } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsRef: DatabaseReference;

  constructor(private db: Database) {
    this.productsRef = ref(this.db, 'products');
  }

  getProducts(): Observable<Product[]> {
    return new Observable(observer => {
      get(this.productsRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const products: Product[] = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            name: value.name,
            description: value.description,
            imageUrl: value.imageUrl,
            detailsUrl: value.detailsUrl,
            category: value.category
          }));
          observer.next(products);
        } else {
          observer.next([]);
        }
        observer.complete();
      }).catch(error => {
        console.error('Error fetching products:', error);
        observer.error(error);
      });
    });
  }

  getLatestProducts(limit: number = 6): Observable<Product[]> {
    return new Observable(observer => {
      const latestProductsQuery = query(this.productsRef, limitToLast(limit));
      
      get(latestProductsQuery).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const products: Product[] = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            name: value.name,
            description: value.description,
            imageUrl: value.imageUrl,
            detailsUrl: value.detailsUrl,
            category: value.category
          }));
          
          // Reverse the array to get the latest products first
          observer.next(products.reverse());
        } else {
          observer.next([]);
        }
        observer.complete();
      }).catch(error => {
        console.error('Error fetching latest products:', error);
        observer.error(error);
      });
    });
  }
}