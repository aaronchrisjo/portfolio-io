import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private location: Location){}


  close():void{
    this.product = null;
  }

}
