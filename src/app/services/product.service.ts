import { Injectable } from '@angular/core';
import { Database, ref, get, DatabaseReference } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsRef: DatabaseReference;

  constructor(private db: Database) {
    // Initialize productsRef after db is initialized
    this.productsRef = ref(this.db, 'products');
  }

  getProducts(): Observable<Product[]> {
    return new Observable(observer => {
      get(this.productsRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const products: Product[] = Object.keys(data).map(key => ({
            id: +data[key].id, // Convert ID to number if necessary
            name: data[key].name,
            description: data[key].description,
            imageUrl: data[key].imageUrl,
            detailsUrl: data[key].detailsUrl,
            category: data[key].category
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
}
