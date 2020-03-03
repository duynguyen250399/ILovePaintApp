import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  constructor() { }

  private defaultImage = '/assets/images/default_product.png';

  @Input() product;

  ngOnInit() {
    if(this.product.image == null){
      this.product.image = this.defaultImage;
    }
  }

}
