import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-your-component',
  templateUrl: './all-templates.component.html',
  styleUrls: ['./all-templates.component.css']
})
export class AllTemplatesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedFilter: string = 'all';
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts(this.selectedFilter); // Apply initial filter
    });
  }

  filterProducts(category: string): void {
    this.selectedFilter = category;
    this.filteredProducts = category === 'all' ? this.products : this.products.filter(product => product.category === category);
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }
}
