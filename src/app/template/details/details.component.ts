import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Location } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private location: Location,
    private favoritesService: FavoritesService
  ) {}

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
