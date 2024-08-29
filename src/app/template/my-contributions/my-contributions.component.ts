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
  filteredProducts: Product[] = []; // New property for filtered products
  loading: boolean = true;
  error: string | null = null;
  originalProductData: { [key: string]: Product } = {}; // To store the original data
  isAdmin: boolean = false;
  searchQuery: string = ''; // New property for search query

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
    const productObservable = this.isAdmin
      ? this.productService.getAllProducts()
      : this.productService.getUserProducts();

    productObservable.subscribe({
      next: (products: Product[]) => {
        this.products = products.map(product => ({ ...product, editing: false })); // Add editing flag
        this.filteredProducts = this.products; // Initialize filtered products
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  filterProducts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(query)
    );
  }

  enableEdit(product: Product): void {
    this.originalProductData[product.id] = { ...product }; // Store original data
    product.editing = true;
  }

  cancelEdit(product: Product): void {
    const originalProduct = this.originalProductData[product.id];
    if (originalProduct) {
      Object.assign(product, originalProduct); // Restore original data
      delete this.originalProductData[product.id]; // Remove from original data store
    }
    product.editing = false;
  }

  saveEdit(product: Product): void {
    this.productService.updateProduct(product.id, product).subscribe({
      next: () => {
        product.editing = false;
        this.loadProducts(); // Reload products to ensure data is up-to-date
      },
      error: (err) => {
        this.error = 'Failed to save changes.';
        console.error(err);
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => {
          this.error = 'Failed to delete product.';
          console.error(err);
        }
      });
    }
  }
}
