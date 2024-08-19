import { Injectable } from '@angular/core';
import { Database, ref, set, remove, onValue } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private userFavoritesRef: string | null = null;

  constructor(private db: Database, private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      if (user) {
        // Set the relative path to the user's favorites
        this.userFavoritesRef = `users/${user.uid}/favorites`;
      } else {
        this.userFavoritesRef = null;
      }
    });
  }

  toggleFavorite(productId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.userFavoritesRef) {
        reject(new Error('User not authenticated'));
        return;
      }

      // Create a reference directly under the user's favorites
      const favoriteRef = ref(this.db, `${this.userFavoritesRef}/${productId}`);
      
      onValue(favoriteRef, (snapshot) => {
        if (snapshot.exists()) {
          // If it's already a favorite, remove it
          remove(favoriteRef).then(resolve).catch(reject);
        } else {
          // If it's not a favorite, add it
          set(favoriteRef, true).then(resolve).catch(reject);
        }
      }, { onlyOnce: true });
    });
  }

  getFavorites(): Observable<string[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        
        return new Observable<string[]>(observer => {
          const userFavoritesRef = ref(this.db, `users/${user.uid}/favorites`);
          
          onValue(userFavoritesRef, (snapshot) => {
            if (snapshot.exists()) {
              const favorites = Object.keys(snapshot.val());
              observer.next(favorites);
            } else {
              observer.next([]);
            }
          }, error => {
            observer.error(error);
          });
        });
      })
    );
  }

  isFavorite(productId: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (!this.userFavoritesRef) {
        observer.next(false);
        observer.complete();
        return;
      }

      const favoriteRef = ref(this.db, `${this.userFavoritesRef}/${productId}`);
      onValue(favoriteRef, (snapshot) => {
        observer.next(snapshot.exists());
        observer.complete();
      }, { onlyOnce: true });
    });
  }
}
