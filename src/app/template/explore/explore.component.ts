import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadLatestProducts();
  }

  loadLatestProducts(): void {
    this.productService.getLatestProducts(9).subscribe(
      products => {
        this.products = products;
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
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}