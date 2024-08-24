import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getUserProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this portfolio?  You will have to upload again once deleted.')) {
      this.productService.deleteProduct(productId)
        .then(() => {
          this.products = this.products.filter(product => product.id !== productId);
        })
        .catch(err => {
          console.error('Failed to delete product:', err);
          this.error = 'Failed to delete product.';
        });
    }
  }
}
