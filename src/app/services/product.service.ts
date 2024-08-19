import { Injectable } from '@angular/core';
import { Database, ref, query, limitToLast, get, DatabaseReference } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsRef: DatabaseReference;

  constructor(private db: Database, private favoritesService: FavoritesService) {
    this.productsRef = ref(this.db, 'products');
  }

  getProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      switchMap(products => 
        combineLatest([
          of(products),
          this.favoritesService.getFavorites()
        ])
      ),
      map(([products, favorites]) => 
        products.map(product => ({
          ...product,
          isFavorite: favorites.includes(product.id)
        }))
      )
    );
  }

  getLatestProducts(limit: number = 6): Observable<Product[]> {
    return this.getLatestProductsFromDB(limit).pipe(
      switchMap(products => 
        combineLatest([
          of(products),
          this.favoritesService.getFavorites()
        ])
      ),
      map(([products, favorites]) => 
        products.map(product => ({
          ...product,
          isFavorite: favorites.includes(product.id)
        }))
      )
    );
  }

  private getAllProducts(): Observable<Product[]> {
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

  private getLatestProductsFromDB(limit: number): Observable<Product[]> {
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