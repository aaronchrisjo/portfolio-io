import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLatestProducts();
  }

  loadLatestProducts(): void {
    this.productService.getLatestProducts(12).subscribe(
      products => {
        setTimeout(() => {
          this.products = products;
          this.loading = false;
          this.cdr.detectChanges(); // Manually trigger change detection
        }, 0);
      },
      error => {
        console.error('Error loading latest products:', error);
      }
    );
  }

  onClickUnready(): void {
    alert('Explore page still under development. Navigate to Portfolios page.');
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModal(product: Product): void {
    console.log('Opening modal with product:', product); // Log product details
    if (!product) {
      console.error('Product is undefined or null. Cannot open modal.');
      return;
    }
    this.selectedProduct = product;
    console.log('Selected product set to:', this.selectedProduct);
  }
  

  closeModal(): void {
    this.selectedProduct = null;
  }
}
