import { Injectable } from '@angular/core';
import { Database, ref, query, limitToLast, orderByChild, equalTo, get, DatabaseReference, remove } from '@angular/fire/database';
import { Observable, combineLatest, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { FavoritesService } from './favorites.service';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsRef: DatabaseReference;

  constructor(private db: Database, private favoritesService: FavoritesService, private authService: AuthService) {
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

  getUserProducts(): Observable<Product[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        const userProductsQuery = query(this.productsRef, orderByChild('userId'), equalTo(user.uid));
        return from(get(userProductsQuery)).pipe(
          map(snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              return Object.entries(data).map(([key, value]: [string, any]) => ({
                id: key,
                name: value.name,
                description: value.description,
                imageUrl: value.imageUrl,
                detailsUrl: value.detailsUrl,
                category: value.category,
                pageUrl: value.pageUrl ?? '',
                technologies: value.technologies ?? [],
                userId: value.userId
              })) as Product[];
            } else {
              return [];
            }
          })
        );
      })
    );
  }

  private getAllProducts(): Observable<Product[]> {
    return from(get(this.productsRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          return Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            name: value.name,
            description: value.description,
            imageUrl: value.imageUrl,
            detailsUrl: value.detailsUrl,
            category: value.category,
            pageUrl: value.pageUrl ?? '',
            technologies: value.technologies ?? [],
            userId: value.userId
          })) as Product[];
        } else {
          return [];
        }
      })
    );
  }

  private getLatestProductsFromDB(limit: number): Observable<Product[]> {
    const latestProductsQuery = query(this.productsRef, limitToLast(limit));
    return from(get(latestProductsQuery)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          return Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            name: value.name,
            description: value.description,
            imageUrl: value.imageUrl,
            detailsUrl: value.detailsUrl,
            category: value.category,
            pageUrl: value.pageUrl ?? '',
            technologies: value.technologies ?? [],
            userId: value.userId
          }))
          .reverse() as Product[];
        } else {
          return [];
        }
      })
    );
  }

  deleteProduct(productId: string): Promise<void> {
    const productRef = ref(this.db, `products/${productId}`);
    return remove(productRef);
  }

}
