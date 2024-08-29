import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service'; // Import AuthService
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
  originalProductData: { [key: string]: Product } = {}; // To store the original data
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isAdmin = this.authService.isAdmin(); // Check if user is admin
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    if (this.isAdmin) {
      this.productService.getAllProducts().subscribe({
        next: (products: Product[]) => {
          this.products = products.map(product => ({ ...product, editing: false })); // Add editing flag
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products.';
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.productService.getUserProducts().subscribe({
        next: (products: Product[]) => {
          this.products = products.map(product => ({ ...product, editing: false })); // Add editing flag
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products.';
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  enableEdit(product: Product): void {
    this.originalProductData[product.id] = { ...product }; // Store original data
    product.editing = true;
  }

  saveEdit(product: Product): void {
    this.productService.updateProduct(product.id, {
      name: product.name,
      description: product.description,
      technologies: product.technologies
    }).then(() => {
      product.editing = false; // Exit edit mode
    }).catch(err => {
      console.error('Failed to save product:', err);
      this.error = 'Failed to save product.';
    });
  }

  cancelEdit(product: Product): void {
    // Restore original data
    product.name = this.originalProductData[product.id].name;
    product.description = this.originalProductData[product.id].description;
    product.technologies = this.originalProductData[product.id].technologies;
    product.editing = false;
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this portfolio? You will have to upload again once deleted.')) {
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
