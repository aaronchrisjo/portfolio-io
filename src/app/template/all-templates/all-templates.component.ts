import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-all-templates',
  templateUrl: './all-templates.component.html',
  styleUrls: ['./all-templates.component.css']
})
export class AllTemplatesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedFilter: string = 'all';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts(this.selectedFilter);
    });
  }

  filterProducts(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === filter);
    }
  }
}
