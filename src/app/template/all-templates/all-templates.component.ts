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
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  selectedFilter: string = 'all';
  selectedProduct: Product | null = null;
  loading: boolean=true;
  isAuthenticated$: Observable<User | null>;

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
        // Check if the technologies field is an array, then convert it to a comma-separated string
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

  applyFilterAndPagination(): void {
    const filtered = this.selectedFilter === 'all' ? this.products : this.products.filter(product => product.category === this.selectedFilter);
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    // Update the displayed products based on current page
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
    window.scrollTo({top:0, behavior:'smooth'})
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilterAndPagination(); // Reapply filter and update pagination
      window.scrollTo({top:0, behavior:'smooth'})
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilterAndPagination(); // Reapply filter and update pagination
      window.scrollTo({top:0, behavior:'smooth'})
    }
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  uploadWarning(){
    alert('While uploading, recheck and make sure the details enetered are correct as it cannot be reversed.')
  }

  
}
