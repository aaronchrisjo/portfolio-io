import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-all-templates',
  templateUrl: './all-templates.component.html',
  styleUrls: ['./all-templates.component.css']
})
export class AllTemplatesComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  selectedFilter: string = 'all';
  selectedProduct: Product | null = null;
  loading: boolean = true;
  isAuthenticated$: Observable<User | null>;
  searchQuery: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 24;
  totalPages: number = 0;

  constructor(private productService: ProductService, private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.map(product => {
        // Convert technologies field to comma-separated string if it's an array
        if (Array.isArray(product.technologies)) {
          product.technologies = product.technologies.join(', ');
        }
        return product;
      });
  
      this.applyFilterAndPagination(); // Initialize with default filter and pagination
      this.loading = false;
    });
  }

  filterProducts(category: string): void {
    this.selectedFilter = category;
    this.applyFilterAndPagination(); // Apply filter and update pagination
  }

  filterSearchProducts(): void {
    this.applyFilterAndPagination(); // Apply search filter and update pagination
  }

  applyFilterAndPagination(): void {
    let filtered = this.products;

    // Apply category filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedFilter);
    }

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product => product.name.toLowerCase().includes(query));
    }

    // Update pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.updatePage(filtered);
  }

  updatePage(filteredProducts: Product[]): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.applyFilterAndPagination(); // Reapply filter and update pagination
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilterAndPagination(); // Reapply filter and update pagination
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilterAndPagination(); // Reapply filter and update pagination
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  uploadWarning(): void {
    alert('While uploading, recheck and make sure the details entered are correct as it cannot be reversed.');
  }
}
