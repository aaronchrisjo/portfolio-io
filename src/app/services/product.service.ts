import { Injectable } from '@angular/core';
import { Database, ref, query, limitToLast, orderByChild, equalTo, get, DatabaseReference, remove, update } from '@angular/fire/database';
import { Observable, combineLatest, of, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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

  getAllProducts(): Observable<Product[]> {
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

  getProducts(): Observable<Product[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (this.authService.isAdmin()) {
          return this.getAllProducts();
        } else if (user) {
          // Regular users should see all products here
          return this.getAllProducts();
        } else {
          return of([]);
        }
      }),
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
        // Regular users see their own products, admins see all
        if (this.authService.isAdmin()) {
          return this.getAllProducts();
        } else {
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
        }
      }),
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

  getLatestProducts(limit: number = 9): Observable<Product[]> {
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

  deleteProduct(productId: string): Observable<void> {
    const productRef = ref(this.db, `products/${productId}`);
    return from(remove(productRef));
  }

  // updateProduct(productId: string, updatedData: Partial<Product>): Observable<void> {
  //   const productRef = ref(this.db, `products/${productId}`);
  //   return from(update(productRef, updatedData));
  // }
  updateProduct(id: string, updatedData: Partial<Product>): Observable<void> {
    const productRef = ref(this.db, `products/${id}`);
  
    // Filter out undefined values
    const sanitizedData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== undefined)
    );
  
    return from(update(productRef, sanitizedData)).pipe(
      catchError(err => {
        console.error('Update failed', err);
        return of(); // Handle the error appropriately
      })
    );
  }
  
  
  
}
