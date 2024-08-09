import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  products: Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit():void{
    this.productService.getProducts().subscribe(products=>{
      this.products = products;
    })
  }

  onClickUnready(){
    alert('Explore page still under developement. Navigate to All-Templates page.')
  }
}
