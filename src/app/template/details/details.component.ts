import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Location } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();
  isAuthenticated$: Observable<User | null>;

  constructor(
    private location: Location,
    private favoritesService: FavoritesService,
    private auth: Auth,
    private authService: AuthService,
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    this.checkIfFavorite();
  }

  checkIfFavorite(): void {
    if (!this.product) {
      return;
    }
    this.favoritesService.isFavorite(this.product.id).subscribe(isFavorite => {
      if (this.product) {
        this.product.isFavorite = isFavorite;
      }
    });
  }

  toggleFavorite(): void {
    if (!this.product) {
      return;
    }
    this.favoritesService.toggleFavorite(this.product.id).then(() => {
      if (this.product) {
        this.product.isFavorite = !this.product.isFavorite;
      }
    }).catch(error => {
      console.error('Error toggling favorite:', error);
    });
  }

  close(): void {
    this.product = null;
    this.closeModal.emit();
  }
}
